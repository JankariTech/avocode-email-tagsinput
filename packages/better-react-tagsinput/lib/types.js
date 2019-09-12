// @flow

import TagsInput from './index'
import CollapsibleTagsInput from './components/collapsible-tagsinput'
import schema from './schema'
import * as plugins from './plugins'
import * as utils from './utils'
import { createPlugins } from './plugins/factory'

import type { Editor } from 'slate-react'

export default TagsInput

export {
  CollapsibleTagsInput,
  schema,
  plugins,
  utils,
  createPlugins,
}

export type Query = string
export type Tag = {|
  value: string,
  state?: string | number,
  data?: Object,
|}
export type Tags = Array<Tag>

export interface PluginFactory {
  renderNode?: (props: Object, editor: Editor, next: Function) => ?React$Node;
  onKeyDown?: (event: SyntheticKeyboardEvent<*>, editor: Editor, next: Function) => void;
  initialize(): Plugin;
}

export type Plugin = {
  onKeyDown?: Function,
  renderNode?: Function,
  commands?: Object,
}

export type KeyCode = number
export type AddTagKeyCodes = Array<KeyCode>
export type Name = string

export type FactoryPluginOptions = {
  addTagKeyCodes: AddTagKeyCodes,
  name: Name,
  onTagAddedRequest: 
(event: SyntheticKeyboardEvent<*>, text: Query) => void,
  onTagDeleteRequest: (event: SyntheticMouseEvent<*> | SyntheticKeyboardEvent<*>, indices: Array<number>, queryNodeText?: Query) => void,
  onPasteRequest?: ?(event: SyntheticClipboardEvent<*>) => void,
}