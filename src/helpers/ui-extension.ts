import { SxProps, Theme } from '@mui/material'
import { SystemStyleObject } from '@mui/system'

export type MergedSxProps = Array<
  boolean | SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>)
>

export function mergeSx(...sxList: SxProps<Theme>[]): MergedSxProps {
  return ([] as MergedSxProps).concat(...sxList)
}
