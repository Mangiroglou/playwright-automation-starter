import { ContactField } from '@test-data/types/ContactField';

export type ContactData = Partial<Record<ContactField, string>> & {
  firstName: string;
  lastName: string;
};

