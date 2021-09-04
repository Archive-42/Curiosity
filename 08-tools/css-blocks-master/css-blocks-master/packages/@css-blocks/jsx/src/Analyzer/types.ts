import { ElementAnalysis } from "@css-blocks/core";
import { ObjectDictionary } from "@opticss/util";
import { Expression } from "babel-types";

export type BooleanExpression = Expression;
export type StringExpression = Expression;
export type TernaryExpression = Expression;

export type JSXElementAnalysis = ElementAnalysis<BooleanExpression, StringExpression, TernaryExpression>;
export type Flags = ObjectDictionary<boolean>;
