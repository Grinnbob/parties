import { extendTheme } from "native-base";

export default extendTheme({
  colors: {
    primary: {
      50: "#366be7",
      100: "#2b62e3",
      200: "#215ade",
      300: "#2255ce",
      400: "#1f50c0",
      500: "#214eb7",
      600: "#224bad",
      700: "#2249a3",
      800: "#234799",
      900: "#234490",
    },
    success: {
      900: "#00b288",
    },
  },
  components: {
    Text: {
      baseStyle: {
        FontSize: 22,
      },
    },
    Pressable: {
      variants: {
        subscription: {
          borderWidth: 1,
          borderColor: "#FFFFFF38",
          marginBottom: "2",
          h: 81,
          paddingX: 4,
          paddingTop: 1,
          w: "100%",
          borderRadius: "26",
        },
      },
    },
    Toast: {
      baseStyle: {
        bg: {
          linearGradient: {
            colors: ["#6c1b9e", "#ff077e"],
            start: [0, 0],
            end: [1, 0],
          },
        },
        p: "10px",
        rounded: "18px",
        shadow: "0px 9px 18px rgba(46, 68, 164, 0.27)",
        paddingLeft: "20px",
        paddingRight: "20px",
        _title: {
          color: "#FFF",
          fontWeight: "700",
          fontSize: 12,
        },
        _description: {
          color: "#FFF",
          fontWeight: "700",
          fontSize: 12,
        },
      },
    },
    Button: {
      baseStyle: {
        borderRadius: "26",
        h: "52",
        w: "90%",
        alignSelf: "center",
      },
      variants: {
        secondary: {
          bg: "primary.200",
          _pressed: { bg: "primary.500" },
          _text: { color: "primary.900" },
        },
        white: {
          bg: "white",
          _pressed: { bg: "primary.500" },
          _text: { color: "primary.900" },
        },
        cancel: {
          bg: "#DD000A1A",
          _pressed: { bg: "#DD000A6a" },
          _text: { color: "#DD000A" },
        },
        subscription: {
          borderWidth: 1,
          borderColor: "#FFFFFF38",
          bg: "transparent",
          marginBottom: "2",
          h: "76",
          padding: 10,
          w: "100%",
        },
        menu: {
          bg: "transparent",
          w: "100%",
          borderRadius: 0,
          borderBottomWidth: 1,
          borderBottomColor: "#444",
          _text: { fontSize: 18 },
        },
      },
    },
    Input: {
      // baseStyle: {
      //   borderRadius: '11',
      //   mt: 2,
      //   h: '44',
      //   w: '90%',
      //   alignSelf: 'center',
      // },
      baseStyle: {
        borderRadius: "24",
        h: "48px",
        alignSelf: "center",
      },

      variants: {},
    },
  },
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
});
