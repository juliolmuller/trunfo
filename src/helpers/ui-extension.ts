import { SxProps, Theme } from '@mui/material/styles'
import { SystemStyleObject } from '@mui/system'

/* eslint-disable @typescript-eslint/indent */
export type MergedSxProps = Array<
  boolean | SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>)
>
/* eslint-enable @typescript-eslint/indent */

export function mergeSx(...sxList: SxProps<Theme>[]): MergedSxProps {
  return ([] as MergedSxProps).concat(...sxList)
}
