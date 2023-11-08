"use client"

import React from "react"
import {
  useRefinementList,
  type RefinementListProps,
} from "react-instantsearch"
import { Checkbox } from "../../common/components/checkbox"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../common/components/card"

type CustomRefinementListProps = RefinementListProps & {
  title: string
}

const RefinementList = (props: CustomRefinementListProps) => {
  const { items, refine } = useRefinementList({ ...props, showMore: true })
  // console.log(items)
  if (items.length === 0) return null
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {items.map((item) => (
          <div key={item.value} className="flex items-center gap-2">
            <Checkbox
              checked={item.isRefined}
              onCheckedChange={(checked) => refine(item.value)}
              id={item.value}
            />
            <label htmlFor={item.value}>{item.label}</label>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default RefinementList
