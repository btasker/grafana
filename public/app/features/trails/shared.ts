import { BusEventBase, BusEventWithPayload } from '@grafana/data';
import { ConstantVariable, SceneObject, SceneVariableSet } from '@grafana/scenes';
import { VariableHide } from '@grafana/schema';

export interface ActionViewDefinition {
  displayName: string;
  value: string;
  getScene: () => SceneObject;
}

export const VAR_METRIC_NAMES = 'metricNames';
export const VAR_FILTERS = 'filters';
export const VAR_FILTERS_EXPR = '{${filters}}';
export const VAR_METRIC = 'metric';
export const VAR_METRIC_EXPR = '${metric}';
export const VAR_GROUP_BY = 'groupby';
export const VAR_GROUP_BY_EXP = '${groupby}';
export const VAR_DATASOURCE = 'ds';
export const VAR_DATASOURCE_EXPR = '${ds}';

export const LOGS_METRIC = '$__logs__';
export const KEY_SQR_METRIC_VIZ_QUERY = 'sqr-metric-viz-query';

export const trailDS = { uid: VAR_DATASOURCE_EXPR };

export type MakeOptional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export function getVariablesWithMetricConstant(metric: string) {
  return new SceneVariableSet({
    variables: [
      new ConstantVariable({
        name: VAR_METRIC,
        value: metric,
        hide: VariableHide.hideVariable,
      }),
    ],
  });
}

export class MetricSelectedEvent extends BusEventWithPayload<string> {
  public static type = 'metric-selected-event';
}

export class OpenEmbeddedTrailEvent extends BusEventBase {
  public static type = 'open-embedded-trail-event';
}
