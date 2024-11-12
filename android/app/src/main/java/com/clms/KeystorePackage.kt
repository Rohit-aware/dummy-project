package com.leads.mypcot

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.uimanager.ViewManager
import java.util.*
import com.leads.mypcot.KeystorePackage

class KeystorePackage : ReactPackage {

    // Registers your Native Modules
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(KeystoreModule(reactContext)) // Register your KeystoreModule here
    }

    // Registers view managers, but this package doesn't have any custom views
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList() // No custom views
    }
}
