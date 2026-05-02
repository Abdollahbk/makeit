import BasicTemplate from './BasicTemplate';
import TimelineTemplate from './TimelineTemplate';
import ModernTemplate from './ModernTemplate';

/**
 * Registry of all available CV templates.
 * Each template ID maps to a React component.
 */
const templates = {
  // Basic Layouts
  basic: BasicTemplate,
  
  // Timeline Style Layouts
  timeline: TimelineTemplate,

  // Premium Modern Layouts
  modern: ModernTemplate,
};

export default templates;