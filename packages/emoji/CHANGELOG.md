# 3.1.3 - 2019-02-25

#### 🐞 Fixed

- More ESM improvements.

#### 🛠 Internal

- Updated dependencies.

# 3.1.2 - 2019-02-17

#### 🐞 Fixed

- Added missing `@babel/runtime` package.

# 3.1.1 - 2019-02-10

#### 🐞 Fixed

- Fixed an issue with TS types being exported from the ESM index.

# 3.1.0 - 2019-02-09

#### 🚀 New

- Added ECMAScript module support via `esm/` built files.
- Removed copyright docblocks from source files to reduce bundle size.

#### 🛠 Internal

- Tested with React v16.8.

# 3.0.0 - 2019-01-08

#### 💥 Breaking

- PropType shapes have been removed.

#### 🛠 Internal

- Added peer dep support for `interweave` 10.0.

# 2.1.0

#### 🚀 New

- Added `alwaysRender` and `throwErrors` options to `withEmojiData`.

# 2.0.1 - 2018-07-18

#### 🐞 Fixed

TypeScript

- Updated to the new `Node` type to resolve React node issues.

# 2.0.0 - 2018-07-10

#### 💥 Breaking

- Updated minimum `react` requirement to 16.3.
- Updated minimum `emojibase` requirement to 2.0.
- Renamed `EmojiData` to `EmojiDataManager`.
- Removed "Emoji" prefix from `EmojiPathShape`, `EmojiSizeShape`, and `EmojiSourceShape`.
- Removed class names from generated elements.
- Reworked `withEmojiData` HOC:
  - Now the default export of the module.
  - HOC component will render `null` until emoji data has loaded.
  - HOC factory now returns a function in which the wrapped component should be passed to.
  - The `compact` and `emojis` props are now options passed to the HOC factory.

#### 🚀 New

- Updated `withEmojiData` to pass the current `EmojiDataManager` instance as an `emojiData` prop.

#### 🛠 Internal

- Converted from Flow to TypeScript.

# 1.4.0 - 2018-04-16

#### 🐞 Fixed

- Updated `componentWillMount` to `componentDidMount` and `componentWillReceiveProps` to
  `componentDidUpdate` in preparation for React 16.3.

# 1.3.1 - 2017-11-10

#### 🚀 New

- Updated `emojibase-regex` to 1.0.9.

#### 🛠 Internal

- Tested against React 16.1.
- Improved build process.

# 1.3.0 - 2017-10-23

#### 🚀 New

- Updated `withEmojiData` to refresh data if props change.

#### 🐞 Fixed

- Passing custom `emoijs` to `withEmojiData` will no longer mutate official data in `EmojiData`.

# 1.2.0 - 2017-10-12

#### 🚀 New

- Updated `interweave` peer dependency to 8.0.
- Added a `renderUnicode` prop to the `Emoji` component.

#### 🐞 Fixed

- Emojis with multiple presentation variants will no longer break the matching process.

#### 🛠 Internal

- Updated `EmojiData` to map data using hexcodes instead of unicode characters.

# 1.1.0 - 2017-09-26

#### 🚀 New

- Updated `prop-types` to 15.6.

#### 🛠 Internal

- Tested against React 16.

# 1.0.0 - 2017-09-25

#### 🎉 Release

- Initial release!

#### 💥 Breaking

- Migrated `Emoji` component to `React.PureComponent`.
- Refactored `EmojiLoader` into an HOC named `withEmojiData`, as the original approach would not
  re-render components correctly in some situations.
- Updated `emojiSize` and `emojiLargeSize` props to accept a string or number, and to default to
  `1em` and `3em` respectively.
  - If using a number, it will pass through to React (which uses `px`).
  - If using a string, it will be used as-is (`1em`).
- Updated `emojiLargeSize` to no longer auto-multiply size. The prop must be defined manually.

#### 🚀 New

- Added `Emoji`, `EmojiPath`, `EmojiSize`, and `EmojiSource` types to the Flowtype definitions.
- Added `EmojiShape`, `EmojiPathShape`, `EmojiSizeShape`, and `EmojiSourceShape` prop types.
- Updated `emojiSize` prop to also set `height` on the `img` tag.
- Updated `withEmojiData` to support new props.
  - `compact` - Will load `compact.json` instead of `data.json` from the CDN.
  - `emojis` - Can be used to manually load emoji data without fetching from the CDN.
- Updated `withEmojiData` to pass new props to the wrapped component.
  - `emojis` - An array of loaded emoji data.
  - `emojiSource` - An object that contains `version`, `locale`, and `compact`.
- Updated parsed and packaged emoji data to include additional properties.
  - Added `unicode`, which is either the emoji or text presentation Unicode character.
  - Added `canonical_shortcodes`, which are an array of shortcodes including surrounding colons.
  - Added `primary_shortcode`, which is the primary and most common shortcode, with colons.

#### 🛠 Internal

- Updated `emojibase` to 1.4.0.
- Updated `emojibase-regex` to 1.0.6.

# Pre-1.0.0

This package was originally part of `interweave` but over time, it grew too large and unwieldy. In
an effort to reduce bloat and dependencies, the emoji functionality was broken off into this
package. The 1.0.0 release mentioned above contains breaking changes against its previous core
implementation.
