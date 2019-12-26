export default {
  locale: 'en',
  messages: {
    'cms.title': 'CMS',
    'cms.label.name': 'Name',
    'cms.label.edit': 'Edit',
    'cms.label.download': 'Download',
    'cms.label.upload': 'Upload',
    'cms.label.delete': 'Delete',
    'cms.label.back': 'Back',
    'cms.label.cancel': 'Cancel',
    'cms.label.save': 'Save',
    'cms.label.saving': 'Saving',
    'cms.label.savingdot': 'Saving...',
    'cms.label.reloading': 'Reloading',
    'cms.label.close': 'Close',
    'cms.label.none': 'None',
    'cms.label.add': 'Add',
    'cms.label.info': 'Info',
    'cms.label.reload': 'Reload',
    'cms.label.here': 'here',
    'cms.label.settings': 'Settings',
    'cms.label.continue': 'Continue',
    'cms.label.errors': 'Errors',
    'cms.label.moveUp': 'Move Up',
    'cms.label.moveDown': 'Move Down',
    'cms.label.chooseoption': 'Choose an option',
    'cms.label.fieldsRequired': 'Required Fields',
    'cms.label.select': 'Choose...',
    'cms.label.minLength': 'Minimum length',
    'cms.label.maxLength': 'Maximum length',
    'cms.label.regexp': 'Regular expression',
    'cms.label.indexable': 'Searchable',
    'cms.label.mandatory': 'Mandatory',
    'cms.label.list': 'List',
    'cms.label.from': 'From',
    'cms.label.to': 'To',
    'cms.label.equal': 'Equal to',
    'cms.label.date.placeholder': 'dd/mm/yyyy',
    'cms.label.presenter.placeholder': 'Press enter key to save changes',
    'cms.label.modal.confirmdelete': 'Do you really want to delete {code}?',
    'cms.label.metadata': 'Metadata',
    'cms.label.modal.confirmpublish': 'Do you really want to publish {code}?',
    'cms.label.modal.confirmunpublish': 'Do you really want to unpublish {code}?',
    'cms.label.files': 'Files',
    'cms.label.images': 'Images',
    'cms.label.addFilePlural': 'Add files',
    'cms.label.dropFilesHere': 'Drop files here',
    'cms.label.dragAndDrop': 'Drag and drop or ',
    'cms.label.browseYourComputer': 'Browse your computer',
    'cms.label.yes': 'Yes',
    'cms.label.no': 'No',
    'cms.label.both': 'Both',
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
    'cms.contentmodel.delete.label': 'Delete Content Model',
    'cms.contentmodel.searchFilter.valueName': 'Name',
    'cms.contentmodel.list.contentTypeHeader': 'Content Type',
    'cms.contentmodel.list.contentModelNameHeader': 'Content Model Name',
    'cms.contentmodel.list.actionsHeader': 'Actions',
    'cms.contentmodel.list.infoDeleted': '{modelname} removed',
    'cms.contentmodel.form.code': 'Code',
    'cms.contentmodel.form.codePlaceholder': 'Code',
    'cms.contentmodel.form.codeHelp': 'You can insert up to 10 numbers',
    'cms.contentmodel.form.nameHelp':
      'You can insert up to 50 characters including upper and lowercase letters, numbers and special characters',
    'cms.contentmodel.form.contentTypeHelp':
      'Choose one of your existing content types to use for your content model',
    'cms.contentmodel.form.htmlmodel': 'HTML Model',
    'cms.contentmodel.form.htmlmodelHelp':
      'This will be your HTML content structure using your content elements provided by given content type',
    'cms.contentmodel.form.htmlmodel.statusassist': 'Content Assist is <strong>ON</strong>',
    'cms.contentmodel.form.htmlmodel.statusattrhelp':
      'Help About Attributes Type is <strong>OFF</strong>',
    'cms.contentmodel.form.htmlmodel.statusadminconf':
      'If you want to change the status, you should set them in Admin Configuration Area',
    'cms.contentmodel.form.saved': 'Content Model "{modelname}" saved',
    'cms.contentmodel.form.editassistant': 'Inline Editing Assistant',
    'cms.contentmodel.form.stylesheet': 'Style Sheet',
    'cms.contentmodel.form.stylesheetHelp':
      'Provide a stylesheet file to be used with your HTML model',
    'cms.contentmodel.form.editassist.dialog':
      'Let&#39;s see an example on how to activate <strong>INLINE EDITING</strong> on Entando labels<br /><br /><ol><li> Open a <strong>TAG</strong> like div p span... </li><li> add the class <strong>&#39;editContent&#39;</strong> to the TAG. Keep in mind that <strong>&#39;editContentText&#39;</strong> class can be used in case of a text-area. </li><li>then add <strong>data-content-id=&quot;$content.getId()&quot;</strong> </li><li>then add the attribute ID (TITLE) of the desidered label adding <strong>data-attr-id=&quot;TITLE&quot;</strong> and close the tag with &gt;. Please be careful when writing the attribute ID as it is <strong>case sensitive</strong> and it must match the label attribute in the next step </li><li>finally add the label of the desidered attribute that will be rendered on screen writing <strong>$content.TITLE.text</strong>.</li><li>Close the <strong>TAG</strong> (div p span ...) opened at the very beginning.</li></ol>Result should look like this:<br /><br /> OPEN TAG class=&quot;editContent&quot; data-content-id=&quot;$content.getId()&quot; data-attr-id=&quot;TITLE&quot;><br />$content.TITLE.text<br />CLOSE TAG',
    'cms.contentmodel.form.presscontext': '(press ctrl + space to open content assist menu)',
    'cms.contentmodel.delete.messageprompt':
      'Are you sure you want to remove <strong>{id} ({descr})</strong>?',
    'cms.contenttype.title': 'Content Types',
    'cms.contenttype.titletip': 'The Content Types section let the administrator add new content types or edit those already existing.',
    'cms.contenttype.add.label': 'Add Content Type',
    'cms.contenttype.edit.label': 'Edit Content Type',
    'cms.contenttype.list.contentTypeNameHeader': 'Name',
    'cms.contenttype.list.contentTypeCodeHeader': 'Code',
    'cms.contenttype.list.contentTypeStatusHeader': 'Status',
    'cms.contenttype.list.actionsHeader': 'Actions',
    'cms.contenttype.list.status': 'Status',
    'cms.contenttype.list.status.0': 'Ok. Reload if you want to.',
    'cms.contenttype.list.status.1': 'Reloading. Refresh this page.',
    'cms.contenttype.list.status.2': 'Stale status, please reload.',
    'cms.contenttype.reference.text':
      'Reload the references for these entity types. Number of type to reload: {count}. ',
    'cms.contenttype.reference.reload': 'Click {link} to reload all content types.',
    'cms.contenttype.attributes.label': 'Attributes',
    'cms.contenttype.editattribute.label': 'Edit Content Type Attribute',
    'cms.contentType.helpattributes.label':
      'This content types section let the administrator add new selected content type attributes or edit those already existing.',
    'cms.contenttype.datatype.label': 'Type',
    'cms.contenttype.datatype.code.label': 'Code',
    'cms.contenttype.form.type': 'Type',
    'cms.contenttype.form.code': 'Code',
    'cms.contenttype.form.codeHelp':
      'You can insert characters uppercase and lowercase letters, numbers and special characters _',
    'cms.contenttype.attribute.codeHelp': 'You must insert 3 uppercase characters',
    'cms.contenttype.attribute.label.listOf': 'List of',
    'cms.contenttype.form.name': 'Name',
    'cms.contenttype.form.role': 'Role',
    'cms.contenttype.form.roles': 'Roles',
    'cms.contenttype.form.mandatory': 'Mandatory',
    'cms.contenttype.form.filter': 'Filter',
    'cms.contenttype.form.actions': 'Actions',
    'cms.contenttype.form.filterList': 'Can be used as a filter in lists',
    'cms.contenttype.form.metadata.defaultContentModel': 'Default content model',
    'cms.contenttype.form.metadata.defaultContentModelLists': 'Default content model for lists',
    'cms.contenttype.form.metadata.viewPage': 'Page for on-the-fly publishing',
    'cms.contenttype.alert.created': 'Content type created successfully',
    'cms.contenttype.attribute.edit.title': 'Edit attribute',
    'cms.contenttype.enumeratorStaticItems': 'Elements',
    'cms.contenttype.enumeratorStaticItems.help':
      "Insert a configuration like 'lable1,lable2,lable3'",
    'cms.contenttype.enumeratorStaticItemsMap.help':
      "Insert a configuration like 'key1=value1,key2=value2,key3=value3'",
    'cms.contenttype.enumeratorStaticItemsSeparator': 'Separator',
    'cms.contenttype.enumeratorExtractorBean': 'Extractor bean name',
    'cms.contenttype.ognl.validation': 'OGNL - Validation',
    'cms.contenttype.ognl.validation.help1':
      'In this section you can insert the attribute validation. ',
    'cms.contenttype.ognl.validation.help2':
      'The OGNL expression must return a boolean value (true or false). In the expression, the object root is the attribute itself. You can access to the methods of the attribute without specifying it or using the prefix #attribute.',
    'cms.contenttype.ognl.validation.help3':
      'You can use the map of the system languages (#langs) and the associated entity (#entity).',
    'cms.contenttype.ognl.validation.help4':
      'Also for the elements of list or composite attributes you can access to the parent attribute (#parent) and for the elements of list attibutes you have the index (#index) at your disposal.',
    'cms.contenttype.ognl.expression': 'OGNL Expression ',
    'cms.contenttype.apply.expression': 'Apply this expression only to filled attribute',
    'cms.contenttype.ognl.validation.add.message.help':
      'You can insert both a help and a compilation error message, or choose a key to bind them to a system Label.',
    'cms.contenttype.ognl.message': 'Help message',
    'cms.contenttype.help.message': 'Help Message',
    'cms.contenttype.help.message.key': 'Key for the help message',
    'cms.contenttype.error.message': 'Error message',
    'cms.contenttype.error.message.key': 'Key for the error message',
    'cms.contenttype.labelrole.choose': 'Choose a role',
    'cms.contenttype.labelrole.assigned': 'Assigned role',
    'cms.contenttype.labelrole.noroles':
      'No roles available: they might have been all assigned, yet.',
    'cms.contenttype.label.working': 'You are working on attribute:',
    'cms.contenttype.label.element.of': 'element of',
    'cms.contenttype.label.edit.attribute': 'Edit : attribute - ',
    'cms.contenttype.label.edit.Monolist': 'Edit : Monolist',
    'cms.contenttype.label.edit.List': 'Edit : List',
    'cms.contentsettings.title': 'Content Settings',
    'cms.contentsettings.titletip':
      'The CONTENT SETTINGS section lets the administrator reload contents references and indexes and select the text editor and to configure the mapping for some parameter into the resource attribute',
    'cms.contentsettings.label.reloadreferences': 'Reload the references',
    'cms.contentsettings.label.reloadindexes': 'Reload the indexes',
    'cms.contentsettings.label.reloadstatus': 'Ready',
    'cms.contentsettings.label.reloadstatus.0': 'Ready',
    'cms.contentsettings.label.reloadstatus.1': 'Reloading',
    'cms.contentsettings.label.reloadstatus.2': 'Error',
    'cms.contentsettings.label.reloadstatus.remark.success':
      'The operation went successful last {date}',
    'cms.contentsettings.label.reloadstatus.remark.failed': 'The operation failed last {date}',
    'cms.contentsettings.cropratios.heading': 'Settings Image Crop Dimensions',
    'cms.contentsettings.cropratios.form.title': 'Add Crop Dimension',
    'cms.contentsettings.ratio.added.success': 'Crop ratio added successfully',
    'cms.contentsettings.ratio.deleted.success': 'Crop ratio deleted successfully',
    'cms.contentsettings.ratio.updated.success': 'Crop ratio updated successfully',
    'cms.contentsettings.label.resourcemap': 'Resource Metadata Mapping',
    'cms.contentsettings.form.addmetadata': 'Add Metadata',
    'cms.contentsettings.form.key': 'Key',
    'cms.contentsettings.form.mapping': 'Mapping',
    'cms.contentsettings.form.help': 'In this section you can add a new metadata',
    'cms.contentsettings.form.metadatamapping': 'Metadata Mapping',
    'cms.contentsettings.form.metadatamapping.help':
      "Comma delimited list of relationships between the metadata resource and the '{key}' parameter in the association of image resource to content attribute",
    'cms.contentsettings.metadata.infoDeleted': '{name} removed',
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
    'cms.contents.edit.contentAttributes.language': 'Attributes can only be edited in the default language section',
    'cms.assets.title': 'Digital Assets',
    'cms.assets.tip':
      'The DIGITAL ASSETS section lets you manage existing resources, images and attachements, access resources list, add or delete resources.  Images and attachments can be uploaded to a digital assets archive and used in content.',
    'cms.assets.list.preview': 'Preview',
    'cms.assets.list.name': 'Name',
    'cms.assets.list.type': 'Type',
    'cms.assets.list.apply': 'Apply',
    'cms.assets.list.uploadedBy': 'Uploaded By',
    'cms.assets.list.uploadedAt': 'Uploaded At',
    'cms.assets.list.group': 'Group',
    'cms.assets.list.categories': 'Categories',
    'cms.assets.list.used': 'Used',
    'cms.assets.list.actions': 'Actions',
    'cms.assets.list.all': 'All',
    'cms.assets.list.image': 'Images',
    'cms.assets.list.file': 'Attachements',
    'cms.assets.list.filterBy': 'Search',
    'cms.assets.list.activeFilters': 'Active Filters',
    'cms.assets.list.clearAll': 'Clear All',
    'cms.assets.list.nothingFound': 'No items found',
    'cms.assets.list.of': 'of',
    'cms.assets.list.items': 'items',
    'cms.datetimepicker.label.hours': 'Pick an hour',
    'cms.datetimepicker.label.minutes': 'Pick a minute',
    'cms.datetimepicker.label.seconds': 'Pick a second',
    'cms.assets.form.name': 'Name',
    'cms.assets.form.categories': 'Categories',
    'cms.assets.form.desc': 'Description',
    'cms.assets.form.group': 'Group',
    'cms.assets.form.filetype': 'Type',
    'cms.assets.form.dimension': 'Dimension',
    'cms.assets.form.title': 'Title',
    'cms.assets.form.filename': 'Filename',
    'cms.assets.form.details': 'Details',
    'cms.assets.form.size.orig': 'Original',
    'cms.assets.form.size.sm': 'Small',
    'cms.assets.form.size.md': 'Medium',
    'cms.assets.form.size.lg': 'Large',
    'cms.assets.form.aspectfree': 'Free',
    'cms.assets.form.x': 'X',
    'cms.assets.form.y': 'Y',
    'cms.assets.form.width': 'Width',
    'cms.assets.form.height': 'Height',
    'cms.assets.form.rotate': 'Rotate',
    'cms.assets.form.xscale': 'Scale X',
    'cms.assets.form.yscale': 'Scale Y',
    'cms.assets.form.scale': 'Flip',
    'cms.assets.form.crop': 'Crop',
    'cms.assets.form.move': 'Move',
    'cms.assets.form.pan': 'Pan',
    'cms.assets.form.zoom': 'Zoom',
    'cms.assets.form.cropsave': 'Apply',
    'cms.assets.form.cropcancel': 'Revert',
    'cms.assets.form.updated': 'Asset "{name}" updated.',
    'cms.assets.form.uploaded': 'Asset "{name}" uploaded.',
    'cms.assets.form.failedUpload': 'Failed to upload asset "{name}".',
    'cms.menu.contents': 'Contents',
    'cms.contents.tip': 'The CONTENTS section lets you manage existing contents, access contents list, add new contents. You can also approve, suspend, or delete contents. In Entando, a Content is a structured element that represents a set of information built using Content Attributes.',
    'cms.contents.quickSearchPlaceHolder': 'Search Content',
    'cms.contents.advancedFilters': 'Advanced Filters',
    'cms.contents.contentType': 'Content Type',
    'cms.contents.group': 'Group',
    'cms.contents.statusMain': 'Status',
    'cms.contents.published': 'Published',
    'cms.contents.toUpdate': 'To Update',
    'cms.contents.toReview': 'To Review',
    'cms.contents.unpublished': 'Unpublished',
    'cms.contents.restriction': 'Restrictions',
    'cms.contents.open': 'Open',
    'cms.contents.restricted': 'Restricted',
    'cms.contents.showMe': 'Show me',
    'cms.contents.allContents': 'All Contents',
    'cms.contents.byMe': 'Contents created by me',
    'cms.contents.search': 'Search',
    'cms.contents.onlyMine': 'Only Mine',
    'cms.contents.draft': 'Draft',
    'cms.contents.ready': 'Ready',
    'cms.contents.toApprove': 'To Approve',
    'cms.contents.approved': 'Approved',
    'cms.contents.rejected': 'Rejected',
    'cms.contents.downloadAs': 'Download As',
    'cms.contents.addContent': 'Add Content',
    'cms.contents.columns': 'Columns',
    'cms.contents.manageVersion': 'Manage Versions',
    'cms.contents.joinCategory': 'Join Category',
    'cms.contents.seeOnlineVersion': 'See Online Version',
    'cms.contents.clone': 'Clone',
    'cms.contents.cloned': 'Cloned',
    'cms.contents.publish': 'Publish',
    'cms.contents.unpublish': 'Unpublish',
    'cms.contents.details': 'Details',
    'cms.contents.reloadReferences': 'Reload References',
    'cms.contents.categoriesToAdd': 'Select Categories to add',
    'cms.contents.chooseJoiningCategories': 'Choose the categories you want to join to the {number} selected content(s)!',
    'cms.contents.joinCategoriesTip': 'The action will change the Draft version of selected contents, not the online version. In order to view the changes in the online version, you need to approve the changes.',
    'cms.contents.delete': 'Delete',
    'cms.contents.description': 'Name',
    'cms.contents.firstEditor': 'Created By',
    'cms.contents.lastModified': 'Last Edited',
    'cms.contents.typeCode': 'Type',
    'cms.contents.created': 'Created Date',
    'cms.contents.actions': 'Actions',
    'cms.contents.selectAll': 'Select All',
    'cms.contents.mainGroup': 'Owner Group',
    'cms.contents.groups': 'Join Groups',
    'cms.contents.onLine': 'Status',
    'cms.contents.status': 'Restrictions',
    'cms.contents.categoriesUpdated': 'Categories Updated',
    'cms.contents.selectContentType': 'Select a Content Type',
    'cms.contents.selectGroup': 'Select a Group',
    'cms.contents.selectedContents': 'You have selected {number} content(s), you can',
    'cms.contents.saved': 'Saved',
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
    'validateForm.code.max10digits': 'Code contains invalid characters or has reached maximum requirements. Only 10 or less numeric characters are allowed.',
    'validateForm.code':
      "Code contains invalid characters. Only alphanumeric characters and the underscore '_' are allowed.",
    'validateForm.name.help':
      'You can insert max 50 characters uppercase and lowercase letters, including numbers and special characters',
  },
};
