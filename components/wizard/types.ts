
import { UserProfile } from '../../types';

export interface WizardStepProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
  handleNext: () => void; // For auto-advance
  activeSection?: string; // For multi-stage steps like Origin/Finnish
  setActiveSection?: (section: string) => void;
}
