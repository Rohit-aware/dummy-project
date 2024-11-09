const getFonts = (fontFamily: 'Roboto-Medium' | "Roboto-Regular" | "Roboto-Light" | "Roboto-Medium" | 'Poppins-Bold' | 'Montserrat-Regular', fontSize: number) => {
    return {
        fontFamily,
        fontSize
    }
}

const fontStyles = {

    r1: getFonts("Roboto-Medium", 41),
    r2: getFonts("Roboto-Regular", 14),
    r3: getFonts("Roboto-Regular", 16),
    r4: getFonts("Roboto-Light", 27),
    r5: getFonts("Roboto-Medium", 27),
    r6: getFonts("Roboto-Regular", 18),
    r7: getFonts("Roboto-Medium", 18),
    r8: getFonts("Roboto-Medium", 16),
    r9: getFonts("Roboto-Regular", 13),
    r10: getFonts("Roboto-Medium", 25),
    r11: getFonts("Roboto-Regular", 27),
    r12: getFonts("Roboto-Regular", 20),
    r13: getFonts("Roboto-Medium", 14),
    r14: getFonts("Roboto-Medium", 13),
    r15: getFonts("Roboto-Regular", 15),
    r16: getFonts("Roboto-Regular", 12),

    p1: getFonts("Poppins-Bold", 20),

    m1: getFonts("Montserrat-Regular", 14)
}
export default fontStyles