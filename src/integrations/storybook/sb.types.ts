import type { DecoratorFunction } from "storybook/internal/csf";

/**
 * Defines strongly typed Storybook meta configuration options.
 *
 * Intended for use with Storybook component metadata (`meta`) to provide
 * stricter typing for commonly used Storybook settings such as layout
 * and documentation tags.
 *
 * @example
 * ```ts
 * const meta: TypedMetaOptions = {
 *   parameters: {
 *     layout: "centered",
 *   },
 *   tags: ["autodocs"],
 * };
 * ```
 */
type TypedMetaOptions = Partial<{
  /**
   * Story-level Storybook parameters.
   */
  parameters: Partial<{
    /**
     * Controls how the story is rendered inside the preview iframe.
     *
     * - `"centered"`: Centers the component in the canvas.
     * - `"fullscreen"`: Removes Storybook padding and uses the full viewport.
     * - `"padded"`: Adds Storybook default padding around the component.
     */
    layout: "centered" | "fullscreen" | "padded";
  }>;

  /**
   * Storybook documentation tags.
   *
   * Common values:
   * - `"autodocs"` Enables automatic documentation generation.
   * - `"!autodocs"` Disables automatic documentation generation.
   */
  tags: Array<"autodocs" | "!autodocs">;
}>;

/**
 * Defines a strongly typed global Storybook preview configuration.
 *
 * Typically used inside `.storybook/preview.ts` for configuring:
 * - global parameters
 * - decorators
 * - viewport presets
 * - controls
 * - story sorting
 *
 * @example
 * ```ts
 * const preview: TypedGlobalPreview = {
 *   parameters: {
 *     layout: "fullscreen",
 *   },
 * };
 * ```
 */
type TypedGlobalPreview = Partial<{
  /**
   * Global Storybook parameters applied to all stories.
   */
  parameters: Partial<{
    /**
     * Storybook UI options configuration.
     */
    options: Partial<{
      /**
       * Controls the ordering of stories in the sidebar.
       *
       * @example
       * ```ts
       * storySort: {
       *   order: ["Introduction", "Components", "Pages"]
       * }
       * ```
       */
      storySort: Partial<{
        order: Array<unknown>;
      }>;
    }>;

    /**
     * Storybook controls configuration.
     *
     * Used for automatic detection of color/date controls.
     */
    controls: Partial<{
      /**
       * Matcher configuration for Storybook controls.
       */
      matchers: Record<string, unknown>;
    }>;

    /**
     * Custom viewport definitions for responsive testing.
     */
    viewport: Partial<{
      /**
       * Collection of named viewport presets.
       */
      options: Viewports;
    }>;

    /**
     * Global layout applied to all stories.
     */
    layout: "fullscreen" | "centered" | "padded";
  }>;

  /**
   * Global Storybook decorators.
   *
   * Decorators wrap stories and are commonly used for:
   * - providers
   * - themes
   * - layouts
   * - global styles
   */
  decorators: Array<DecoratorFunction>;
}>;

/**
 * Defines a collection of custom Storybook viewport presets.
 *
 * Used with the Storybook viewport addon for responsive testing.
 *
 * @example
 * ```ts
 * const viewports: Viewports = {
 *   mobile: {
 *     name: "Mobile",
 *     styles: {
 *       width: "375px",
 *       height: "812px",
 *     },
 *     type: "mobile",
 *   },
 * };
 * ```
 */
type Viewports = Record<
  string,
  {
    /**
     * Display name shown in the Storybook viewport selector.
     */
    name: string;

    /**
     * CSS dimensions for the viewport.
     */
    styles: {
      /**
       * Width of the viewport.
       *
       * Must be a pixel string (e.g. `"375px"`).
       */
      width?: `${number}px`;

      /**
       * Height of the viewport.
       *
       * Must be a pixel string (e.g. `"812px"`).
       */
      height?: `${number}px`;
    };

    /**
     * Optional viewport classification.
     */
    type?: "desktop" | "mobile" | "tablet" | "other";
  }
>;

export type { TypedGlobalPreview, TypedMetaOptions, Viewports };
