import type { Preview } from "@storybook/react-vite";
import { INITIAL_VIEWPORTS } from "storybook/viewport";
import { ThemeDecorator } from "./decorator";
/* eslint-disable */
// @ts-ignore
import "./sb.css";
// @ts-ignore
import "../src/styles.css";
import type {
  TypedGlobalPreview,
  Viewports,
} from "@/integrations/storybook/sb.types";
/* eslint-enable */

const preview: Preview & TypedGlobalPreview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    options: {
      storySort: {
        order: [
          "design",
          "components",
          ["index", "header", "main", "footer", "*"],
          "ui",
        ],
      },
    },

    viewport: {
      options: {
        /**
         * we could use `INITIAL_VIEWPORTS` here, but some viewport size
         * are same and repeatative for different devices, so we used
         * this `CustomViewports` and filtered the repeatative viewports.
         * we added some extra viewports too.
         */
        ...CustomViewports(),
      },
    },
  },

  decorators: [ThemeDecorator],
};

export default preview;

function CustomViewports(): Viewports {
  const viewports: Viewports = {
    ...INITIAL_VIEWPORTS,
    "pc-small": {
      name: "Laptop",
      styles: {
        height: `${720}px`,
        width: `${1280}px`,
      },
      type: "desktop",
    },
    "pc-large": {
      name: "Desktop",
      styles: {
        height: `${1080}px`,
        width: `${1920}px`,
      },
      type: "desktop",
    },
    "2K-screen": {
      name: "TV - 2K | Screen",
      styles: {
        height: `${1440}px`,
        width: `${2560}px`,
      },
      type: "desktop",
    },
    "4K-screen": {
      name: "TV - 4K | Screen",
      styles: {
        height: `${2160}px`,
        width: `${3840}px`,
      },
      type: "desktop",
    },
  };

  const removedViewports: string[] = [
    /**
     * removed iphone8p in favour of iphone6p
     * see iPhone 6 Plus (iphone6p) as it has same viewport
     * as iPhone 8 Plus (iphone8p)
     */
    "iphone8p",

    /**
     * removed iphonexsmax in favour of iphonexr
     * see iPhone XR (iphonexr) as it has same viewport
     * as iPhone XS Max (iphonexsmax)
     */
    "iphonexsmax",

    /**
     * removed iphonese2 in favour of iphone6
     * see iPhone 6 (iphone6) as it has same viewport
     * as iPhone SE (2nd generation) (iphonese2)
     */
    "iphonese2",

    /**
     * removed iphone12mini in favour of iphonex
     * see iPhone X (iphonex) as it has same viewport
     * as iPhone 12 mini (iphone12mini)
     */
    "iphone12mini",

    /**
     * removed iphoneSE3 in favour of iphone6
     * see iPhone 6 (iphone6) as it has same viewport
     * as iPhone SE (3rd generation) (iphoneSE3)
     */
    "iphoneSE3",

    /**
     * removed iphone13 in favour of iphone12
     * see iPhone 12 (iphone12) as it has same viewport
     * as iPhone 13 (iphone13)
     */
    "iphone13",

    /**
     * removed iphone13pro in favour of iphone12
     * see iPhone 12 (iphone12) as it has same viewport
     * as iPhone 13 Pro (iphone13pro)
     */
    "iphone13pro",

    /**
     * removed iphone13promax in favour of iphone12promax
     * see iPhone 12 Pro Max (iphone12promax) as it has same viewport
     * as iPhone 13 Pro Max (iphone13promax)
     */
    "iphone13promax",

    /**
     * removed iphone14 in favour of iphone12
     * see iPhone 12 (iphone12) as it has same viewport
     * as iPhone 14 (iphone14)
     */
    "iphone14",
  ];

  type TArrElem = [keyof Viewports, Viewports[keyof Viewports]];

  let mergedReduced: TArrElem[] = [];

  Object.entries(viewports)
    .reduce<[TArrElem[], TArrElem[], TArrElem[], TArrElem[]]>(
      (acc, curr) => {
        /**
         * filter viewport based on type
         * and delete filterd viewport
         */
        delete viewports[curr[0]];
        if (curr[1].type === "mobile") {
          acc[0].push(curr);
        }
        if (curr[1].type === "tablet") {
          acc[1].push(curr);
        }
        if (curr[1].type === "desktop") {
          acc[2].push(curr);
        }
        if (curr[1].type === "other") {
          acc[3].push(curr);
        }

        return acc;
      },
      [[], [], [], []],
    )
    .forEach((ele) => {
      mergedReduced = [...mergedReduced, ...ele];
    });

  mergedReduced.forEach((elem) => {
    /**
     * rebuild deleted viewports this time it is sorted
     */
    viewports[elem[0]] = elem[1];
  });

  // ! temporary fix for default rotated viewports
  const defaultRoatetedViewports = ["ipad", "ipad10p", "ipad11p", "ipad12p"];
  defaultRoatetedViewports.forEach((selectedViewport) => {
    const { height, width } = viewports[selectedViewport].styles;

    viewports[selectedViewport].styles.height = width;
    viewports[selectedViewport].styles.width = height;
  });

  removedViewports.forEach((viewportName) => {
    delete viewports[viewportName];
  });

  return viewports;
}
