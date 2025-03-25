import type * as React from "react"

export const Chart = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const ChartXAxis = ({ dataKey }: { dataKey: string }) => {
  return null
}

export const ChartYAxis = ({ tickFormatter }: { tickFormatter?: (value: number) => string }) => {
  return null
}

export const ChartTooltip = ({ content }: { content: React.ReactNode }) => {
  return null
}

export const ChartLegend = () => {
  return null
}

export const ChartArea = ({
  dataKey,
  fill,
  fillOpacity,
  stroke,
  data,
}: { dataKey: string; fill: string; fillOpacity: number; stroke: string; data: any[] }) => {
  return null
}

export const ChartBar = ({
  dataKey,
  data,
  fill,
  radius,
}: { dataKey: string; data: any[]; fill: string; radius: number[] }) => {
  return null
}

export const ChartLine = ({
  dataKey,
  stroke,
  strokeWidth,
  activeDot,
  data,
}: { dataKey: string; stroke: string; strokeWidth: number; activeDot: any; data: any[] }) => {
  return null
}

export const ChartPie = ({
  dataKey,
  nameKey,
  data,
  cx,
  cy,
  outerRadius,
  fill,
  label,
  children,
}: {
  dataKey: string
  nameKey: string
  data: any[]
  cx: string
  cy: string
  outerRadius: number
  fill: string
  label: any
  children: React.ReactNode
}) => {
  return null
}

