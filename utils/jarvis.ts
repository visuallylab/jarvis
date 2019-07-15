import { ActionType, TemplateType, DataType } from '@/constants/actionRouter';
import { Focus } from '@/contexts/actionRouter';

export function getActionType(action: string | null) {
  if (!action) {
    return '';
  }
  switch (action) {
    case 'see':
    case 'tell':
    case 'show': {
      return ActionType.Show;
    }
    case 'analyze':
    case 'compare': {
      return ActionType.Compare;
    }
    case 'find':
    case 'focus': {
      return ActionType.Focus;
    }
    default: {
      // TODO: need to think how to implement default;
      return '';
    }
  }
}

export function getTemplateType(
  data: string[],
): {
  templateType: TemplateType | '';
  dataTypes: DataType[];
} {
  let templateType: TemplateType | '' = '';
  const dataTypes: DataType[] = [];

  data.forEach(cur => {
    switch (cur) {
      // switch specific template
      case 'traffic realtime':
      case 'traffic status': {
        templateType = TemplateType.T_Realtime;
      }
      default: {
        const { dataType, template } = getDataType(cur);
        if (!templateType) {
          templateType = template;
        }
        dataTypes.push(dataType);
      }
    }
  });

  return {
    templateType,
    dataTypes,
  };
}

export function getDataType(data: string) {
  return {
    dataType: DataType.E_UsageRatio,
    template: TemplateType.Statistics,
  };
}

export function getFocus(status: string | null): Focus[] {
  return [];
}
