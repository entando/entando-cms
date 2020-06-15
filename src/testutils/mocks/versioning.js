export const LIST_VERSIONING_OK = [
  {
    description: 'Content 1',
    id: 'NWS1',
    editor: 'ichalagashvili',
    lastModify: '04/06/2020',
    onLine: true,
    lastVersion: '1.6',
    contentType: 'News',
    status: 'PUBLIC',
  },
  {
    description: 'Content 2',
    id: 'PRS2',
    editor: 'admin',
    lastModify: '08/05/2020',
    onLine: true,
    lastVersion: '2.2',
    contentType: 'Press',
    status: 'ready',
  },
  {
    description: 'Content 3',
    id: 'NWS3',
    editor: 'admin',
    lastModify: '04/05/2020',
    onLine: true,
    lastVersion: '1.0',
    contentType: 'News',
    status: 'unpublished',
  },
];

export const LIST_SINGLE_VERSIONING_OK = [
  {
    description: 'Content numero single 1',
    id: 'CNTNT1',
    editor: 'admin',
    lastModify: '04/06/2020',
    onLine: true,
    lastVersion: '1.6',
    contentType: 'type 1',
    status: 'PUBLIC',
  },
  {
    description: 'This Content numero single 0',
    id: 'CNTNT3',
    editor: 'admin',
    lastModify: '04/05/2020',
    onLine: true,
    lastVersion: '1.2',
    contentType: 'type 1',
    status: 'ready',
  },
];

export const LIST_ATTACHMENTS_OK = [
  {
    id: 'ATTCH_0001',
    description: 'ATTCH 0001 desc',
    lastVersion: '0.1',
    lastModify: '2020-06-09T18:13:28.704Z',
    fileName: 'attch-1.pdf',
    sizeBytes: 8,
  },
  {
    id: 'ATTCH_0002',
    description: 'Attachment 0002 description',
    lastVersion: '0.2',
    lastModify: '2020-06-10T18:13:28.704Z',
    fileName: 'attachment-file-2.pdf',
    sizeBytes: 1024,
  },
  {
    id: 'ATTCH_0003',
    description: 'This is a description of attachment number 0003. This is a long description',
    lastVersion: '0.33',
    lastModify: '2000-01-01T00:00:00.001Z',
    fileName: 'interesting-attachment-file-3-name-final-final-really-final.pdf',
    sizeBytes: 1024 * 1024,
  },
  {
    id: 'ATTCH_0004',
    description: 'This is a very long description of attachment number 0004 (zero zero zero four). As you can see, this is a very long text. Maybe you will be able to notice some breaking views. Hope this helps.',
    lastVersion: '1.2',
    lastModify: '1988-07-25T16:00:00.000Z',
    fileName: 'interesting-attachment-file-4-this-is-a-very-long_file_name_for_YOU_TO_TEST-LONG_NAMES-name-final-final-really-final.jpg',
    sizeBytes: 1024 * 1024 * 1024,
  },
  {
    id: 'ATTCH_0005',
    description: 'Large file size',
    lastVersion: '1.12',
    lastModify: '1988-07-25T16:00:00.000Z',
    fileName: 'large.jpg',
    sizeBytes: 1024 * 1024 * 1024 * 1024,
  },
];

export const DELETE_ATTACHMENT_OK = { success: true };
export const RESTORE_ATTACHMENT_OK = { success: true };
