import AnalysisTypes from '../../../../../../../shared/analysis/analysisTypes.js';
import BaseRekognitionTab from './baseRekognitionTab.js';

export default class CustomLabelTab extends BaseRekognitionTab {
  constructor(previewComponent, data, defaultTab = false) {
    super(AnalysisTypes.Rekognition.CustomLabel, previewComponent, data, defaultTab);
    /* reset tab name to append model name */
    this.title = `${this.title} (${data.customLabelModels.substring(0, 6)}...)`;
  }
}
