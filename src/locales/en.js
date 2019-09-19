export default {
  locale: 'en',
  messages: {
    'cms.title': 'CMS',
    'cms.label.name': 'Name',
    'cms.label.edit': 'Edit',
    'cms.label.delete': 'Delete',
    'cms.label.save': 'Save',
    'cms.label.close': 'Close',
    'cms.label.fieldsRequired': 'Required Fields',
    'cms.label.select': 'Choose...',
    'cms.menu.dashboard': 'Dashboard',
    'cms.menu.cms': 'CMS',
    'cms.menu.contentlist': 'Content List',
    'cms.menu.contenttypes': 'Content Types',
    'cms.menu.contentmodels': 'Content Models',
    'cms.menu.contentsettings': 'Content Settings',
    'cms.contentmodel.title': 'Content Models',
    'cms.contentmodel.titletip': 'You can create content model here',
    'cms.contentmodel.titletip.edit': 'You can modify content model here',
    'cms.contentmodel.searchPlaceholder': 'Search Content Model',
    'cms.contentmodel.searchFilter.label': 'Search By',
    'cms.contentmodel.add.label': 'Add Content Model',
    'cms.contentmodel.edit.label': 'Edit Content Model',
    'cms.contentmodel.searchFilter.valueName': 'Name',
    'cms.contentmodel.list.contentTypeHeader': 'Content Type',
    'cms.contentmodel.list.contentModelNameHeader': 'Content Model Name',
    'cms.contentmodel.list.actionsHeader': 'Actions',
    'cms.contentmodel.form.code': 'Code',
    'cms.contentmodel.form.codePlaceholder': 'Code',
    'cms.contentmodel.form.codeHelp': 'You can insert up to 10 numbers',
    'cms.contentmodel.form.nameHelp': 'You can insert up to 50 characters including upper and lowercase letters, numbers and special characters',
    'cms.contentmodel.form.contentTypeHelp': 'Choose one of your existing content types to use for your content model',
    'cms.contentmodel.form.htmlmodel': 'HTML Model',
    'cms.contentmodel.form.htmlmodelHelp': 'This will be your HTML content structure using your content elements provided by given content type',
    'cms.contentmodel.form.htmlmodel.statusassist': 'Content Assist is <strong>ON</strong>',
    'cms.contentmodel.form.htmlmodel.statusattrhelp':
      'Help About Attributes Type is <strong>OFF</strong>',
    'cms.contentmodel.form.htmlmodel.statusadminconf':
      'If you want to change the status, you should set them in Admin Configuration Area',
    'cms.contentmodel.form.saved': 'Content Model "{modelname}" saved',
    'cms.contentmodel.form.editassistant': 'Inline Editing Assistant',
    'cms.contentmodel.form.stylesheet': 'Style Sheet',
    'cms.contentmodel.form.stylesheetHelp': 'Provide a stylesheet file to be used with your HTML model',
    'cms.contentmodel.form.editassist.dialog': 'Let&#39;s see an example on how to activate <strong>INLINE EDITING</strong> on Entando labels<br /><br /><ol><li> Open a <strong>TAG</strong> like div p span... </li><li> add the class <strong>&#39;editContent&#39;</strong> to the TAG. Keep in mind that <strong>&#39;editContentText&#39;</strong> class can be used in case of a text-area. </li><li>then add <strong>data-content-id=&quot;$content.getId()&quot;</strong> </li><li>then add the attribute ID (TITLE) of the desidered label adding <strong>data-attr-id=&quot;TITLE&quot;</strong> and close the tag with &gt;. Please be careful when writing the attribute ID as it is <strong>case sensitive</strong> and it must match the label attribute in the next step </li><li>finally add the label of the desidered attribute that will be rendered on screen writing <strong>$content.TITLE.text</strong>.</li><li>Close the <strong>TAG</strong> (div p span ...) opened at the very beginning.</li></ol>Result should look like this:<br /><br /> OPEN TAG class=&quot;editContent&quot; data-content-id=&quot;$content.getId()&quot; data-attr-id=&quot;TITLE&quot;><br />$content.TITLE.text<br />CLOSE TAG',
    'cms.contentmodel.form.presscontext': '(press ctrl + space to open content assist menu)',
    /* Edit Content starts HERE */
    'cms.new': 'New',
    'cms.save': 'Save',
    'cms.cancel': 'Cancel',
    'cms.contents.edit.contentCategoryList': 'Content Category List',
    'cms.categories.expandAll': 'Expand All',
    'cms.categories.collapseAll': 'Collapse All',
    'cms.join': 'Join',
    'cms.unpublish': 'Unpublish',
    'cms.saveAndApprove': 'Save and Approve',
    'cms.saveAndContinue': 'Save and Continue',
    'cms.setContentAs': 'Set content as',
    'cms.chooseAnOption': 'Choose an option',
    'cms.contents.title': 'Contents',
    'cms.contents.edit.title': 'Edit',
    'cms.contents.edit.info': 'Info',
    'cms.contents.edit.groups': 'Groups',
    'cms.contents.edit.groups.ownerGroup.label': 'Owner Group',
    'cms.contents.edit.groups.ownerGroup.button': 'Set Group',
    'cms.contents.edit.groups.joinGroup.label': 'Join Group',
    'cms.contents.edit.categories': 'Categories',
    'category.tree': 'Categories Tree',
    'cms.contents.edit.groups.ownerGroup.tooltip':
      'You should set the Main group right now, or some things will get sketchy.',
    'cms.contents.edit.tip': '* Required Fields',
    'cms.contents.edit.contentType.label': 'Content type',
    'cms.contents.edit.contentDescription.label': 'Content description',
    'cms.contents.edit.contentDescription.tooltip':
      'Provide a description or I will use the title if available.',
    'cms.contents.edit.contentDescription.placeholder':
      'Descriptions help you archive, sort, and find contents',
    'cms.contents.edit.version.label': 'Version',
    'cms.contents.edit.version.creator': 'created - by',
    'cms.contents.edit.version.modifier': 'modified by',
    'cms.stickySave.lastAutoSave': 'Last autosave was:',
    'cms.stickySave.status': 'Status',
    'cms.contents.edit.titletip':
      'The CONTENTS section lets you manage existing contents, access contents list, add new contents. You can also approve, suspend, or delete contents. In Entando, a Content is a structured element that represents a set of information built using Content Attributes.',
    'cms.contents.edit.contentAttributes': 'Content Attributes',
    /* Edit Content ends HERE */
    'validateForm.elements': "Insert a configuration like 'key1=value1,key2=value2,key3=value3'",
    'validateForm.element': "Insert a configuration like 'lable1,lable2,lable3'",
    'validateForm.element.code': 'Code must be 3 uppercase letters',
    'validateForm.required': 'Field required',
    'validateForm.maxLength': 'Must be {max} characters or less',
    'validateForm.minLength': 'Must be {min} characters or more',
    'validateForm.number': 'Must be a number',
    'validateForm.minValue': 'Must be at least {min}',
    'validateForm.maxValue': 'Must be at most {max}',
    'validateForm.email': 'Invalid email address',
    'validateForm.alphaNumeric': 'Only alphanumeric characters',
    'validateForm.widgetCode':
      '{name} Contains invalid characters. Only alphanumeric characters and the underscore _ are allowed',
    'validateForm.passwordNotMatch': "Confirm value doesn't match with Password value",
    'validateForm.code':
      "Code contains invalid characters. Only alphanumeric characters and the underscore '_' are allowed.",
  },
};
