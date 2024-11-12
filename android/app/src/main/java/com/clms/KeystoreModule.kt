package com.leads.mypcot

import android.util.Base64
import javax.crypto.Cipher
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey
import javax.crypto.spec.GCMParameterSpec
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import java.security.KeyStore
import android.security.keystore.KeyProperties
import android.security.keystore.KeyGenParameterSpec

class KeystoreModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val KEY_ALIAS = "user_token_key"
    private val keyStore: KeyStore = KeyStore.getInstance("AndroidKeyStore").apply { load(null) }

    override fun getName(): String {
        return "KeystoreModule"
    }

    // Generate and store the encryption key in the Keystore
    private fun generateKey() {
        try {
            val keyGenerator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore")
            val keySpec = KeyGenParameterSpec.Builder(KEY_ALIAS, KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
                .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
                .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
                .build()

            keyGenerator.init(keySpec)
            keyGenerator.generateKey()
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    // Retrieve the encryption key from the Keystore
    private fun getEncryptionKey(): SecretKey {
        val entry = keyStore.getEntry(KEY_ALIAS, null) as KeyStore.SecretKeyEntry
        return entry.secretKey
    }

    @ReactMethod
    fun storeToken(token: String, successCallback: Callback, errorCallback: Callback) {
        try {
            // Generate key if not already present
            if (!keyStore.containsAlias(KEY_ALIAS)) {
                generateKey()
            }

            val cipher = Cipher.getInstance("AES/GCM/NoPadding")
            cipher.init(Cipher.ENCRYPT_MODE, getEncryptionKey())

            // Generate random IV for encryption
            val iv = cipher.iv
            val encryptedData = cipher.doFinal(token.toByteArray(Charsets.UTF_8))

            // Combine IV and encrypted data into one byte array
            val ivAndEncryptedData = ByteArray(iv.size + encryptedData.size)
            System.arraycopy(iv, 0, ivAndEncryptedData, 0, iv.size)
            System.arraycopy(encryptedData, 0, ivAndEncryptedData, iv.size, encryptedData.size)

            // Base64 encode to store or transmit as a string
            val encryptedString = Base64.encodeToString(ivAndEncryptedData, Base64.DEFAULT)

            // Store the encrypted token in SharedPreferences (or another secure storage)
            storeEncryptedToken(encryptedString)

            successCallback.invoke("Token stored successfully")
        } catch (e: Exception) {
            e.printStackTrace()
            errorCallback.invoke("Error storing token: ${e.message}")
        }
    }

    // Retrieve the encrypted token from SharedPreferences
    private fun storeEncryptedToken(token: String) {
        val sharedPreferences = reactApplicationContext.getSharedPreferences("SecurePrefs", android.content.Context.MODE_PRIVATE)
        val editor = sharedPreferences.edit()
        editor.putString("encrypted_token", token)
        editor.apply()
    }

    // Retrieve the encrypted token from SharedPreferences
    private fun getEncryptedTokenFromStorage(): String? {
        val sharedPreferences = reactApplicationContext.getSharedPreferences("SecurePrefs", android.content.Context.MODE_PRIVATE)
        return sharedPreferences.getString("encrypted_token", null)
    }

    @ReactMethod
    fun getToken(successCallback: Callback, errorCallback: Callback) {
        try {
            val encryptedToken = getEncryptedTokenFromStorage()
            if (encryptedToken == null) {
                errorCallback.invoke("No token found in storage")
                return
            }

            val cipher = Cipher.getInstance("AES/GCM/NoPadding")
            val ivAndEncryptedData = Base64.decode(encryptedToken, Base64.DEFAULT)

            // Extract IV from the first part of the data (IV size is fixed)
            val iv = ivAndEncryptedData.copyOfRange(0, 12) // GCM's IV size is always 12 bytes
            val encryptedData = ivAndEncryptedData.copyOfRange(12, ivAndEncryptedData.size)

            // Set the IV and decrypt the data
            cipher.init(Cipher.DECRYPT_MODE, getEncryptionKey(), GCMParameterSpec(128, iv))
            val decryptedData = cipher.doFinal(encryptedData)

            val token = String(decryptedData, Charsets.UTF_8)
            successCallback.invoke(token) // Return the decrypted token
        } catch (e: Exception) {
            e.printStackTrace()
            errorCallback.invoke("Error retrieving token: ${e.message}")
        }
    }
}
