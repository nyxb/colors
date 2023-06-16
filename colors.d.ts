import { Colors } from "./types"

declare const colors: Colors & { createColors: (enabled?: boolean) => Colors }

export = colors
