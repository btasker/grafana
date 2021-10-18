import { VisualizationSuggestionsBuilder } from '@grafana/data';
import { StatPanelOptions } from './types';

export function getSuggestions(builder: VisualizationSuggestionsBuilder) {
  const list = builder.getListAppender<StatPanelOptions, {}>({
    name: 'Stat',
    pluginId: 'stat',
    options: {},
    fieldConfig: {
      defaults: {
        unit: 'short',
        custom: {},
      },
      overrides: [],
    },
    previewModifier: (s) => {
      if (s.options!.reduceOptions.values) {
        s.options!.reduceOptions.limit = 1;
      }
    },
  });

  if (builder.dataFrameCount === 1 && builder.dataRowCountTotal < 10) {
    list.append({
      options: {
        reduceOptions: {
          values: true,
          calcs: [],
        },
      },
    });
  } else {
    list.append({
      options: {
        reduceOptions: {
          values: false,
          calcs: ['lastNotNull'],
        },
      },
    });
  }
}
