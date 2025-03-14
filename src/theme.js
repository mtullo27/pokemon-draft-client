import { createTheme } from "@mui/material/styles"

const theme = createTheme({
    palette: {
        primary: {
            main: "#261B39"
        },
        secondary: {
            main: "#343541"
        }
    },
    spacing: 8,
    typography: {
        // This sets the default typography font family (e.g. for the <Typography> component)
        fontFamily: `-apple-system, BlinkMacSystemFont, sans-serif`,
        // Custom typography variants with the Apple system font variations:
        appleSystemBody: {
            fontFamily: "-apple-system-body"
        },
        appleSystemHeadline: {
            fontFamily: "-apple-system-headline"
        },
        appleSystemSubheadline: {
            fontFamily: "-apple-system-subheadline"
        },
        appleSystemCaption1: {
            fontFamily: "-apple-system-caption1"
        },
        appleSystemCaption2: {
            fontFamily: "-apple-system-caption2"
        },
        appleSystemFootnote: {
            fontFamily: "-apple-system-footnote"
        },
        appleSystemShortBody: {
            fontFamily: "-apple-system-short-body"
        },
        appleSystemShortHeadline: {
            fontFamily: "-apple-system-short-headline"
        },
        appleSystemShortSubheadline: {
            fontFamily: "-apple-system-short-subheadline"
        },
        appleSystemShortCaption1: {
            fontFamily: "-apple-system-short-caption1"
        },
        appleSystemShortFootnote: {
            fontFamily: "-apple-system-short-footnote"
        },
        appleSystemTallBody: {
            fontFamily: "-apple-system-tall-body"
        }
    },
    // Global CSS override to style the body element directly.
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontFamily: `-apple-system, BlinkMacSystemFont, sans-serif`
                }
            }
        }
    }
})

export default theme
