export default {
  locale: 'it',
  messages: {
    'cms.title': 'CMS',
    'cms.label.name': 'Nome',
    'cms.label.edit': 'Modificare',
    'cms.label.delete': 'Elimina',
    'cms.label.back': 'Indietro',
    'cms.label.save': 'Salva',
    'cms.label.close': 'Chiudi',
    'cms.label.fieldsRequired': 'Campi obbligatori',
    'cms.label.select': 'Scegliere...',
    'cms.menu.dashboard': 'Dashboard',
    'cms.menu.cms': 'CMS',
    'cms.menu.contentlist': 'Contenuti',
    'cms.menu.contenttypes': 'Tipi di Contenuto',
    'cms.menu.contentmodels': 'Modelli di Contenuto',
    'cms.menu.contentsettings': 'Impostazione Contenuti',
    'cms.contentmodel.title': 'Modelli di Contenuto',
    'cms.contentmodel.titletip': 'Puoi creare un modello di contenuto qui',
    'cms.contentmodel.titletip.edit': 'È possibile modificare il modello di contenuto qui',
    'cms.contentmodel.searchPlaceholder': 'Cerca Modello di Contenuto',
    'cms.contentmodel.searchFilter.label': 'Cercato da',
    'cms.contentmodel.add.label': 'Aggiungere',
    'cms.contentmodel.edit.label': 'Modificare',
    'cms.contentmodel.delete.label': 'Elimina il Modello di Contenuto',
    'cms.contentmodel.searchFilter.valueName': 'Nome',
    'cms.contentmodel.list.contentTypeHeader': 'Tipo di contenuto',
    'cms.contentmodel.list.contentModelNameHeader': 'Nome Modello di Contenuto',
    'cms.contentmodel.list.actionsHeader': 'Azioni',
    'cms.contentmodel.list.infoDeleted': '{modelname} rimosso',
    'cms.contentmodel.form.code': 'Codice',
    'cms.contentmodel.form.codePlaceholder': 'Codice',
    'cms.contentmodel.form.codeHelp': 'È possibile inserire fino a 10 numeri',
    'cms.contentmodel.form.nameHelp': 'Puoi inserire caratteri, lettere maiuscole e minuscole, numeri, ed il carattere speciale',
    'cms.contentmodel.form.htmlmodel': 'Modello HTML',
    'cms.contentmodel.form.htmlmodelHelp': 'Questa sarà la tua struttura di contenuto HTML usando gli elementi di contenuto forniti da un determinato tipo di contenuto',
    'cms.contentmodel.form.htmlmodel.statusassist': 'l\'assistente ai contenuti è <strong>ATTIVO</strong>',
    'cms.contentmodel.form.htmlmodel.statusattrhelp': 'Aiuto Informazioni sul tipo di attributi è <strong>DISATTIVATO</strong>',
    'cms.contentmodel.form.htmlmodel.statusadminconf': 'Se si desidera modificare lo stato, è necessario impostarli nell\'area di configurazione dell\'amministratore',
    'cms.contentmodel.form.saved': 'Modello di Contenuto "{modelname}" Salvato',
    'cms.contentmodel.form.editassistant': 'Assistente per la Modifica in Linea',
    'cms.contentmodel.form.stylesheet': 'Foglio di Stile',
    'cms.contentmodel.form.stylesheetHelp': 'Fornisci un file di foglio di stile da utilizzare con il tuo modello HTML',
    'cms.contentmodel.form.editassist.dialog': 'Di seguito un esempio su come utilizzare l\'<strong>INLINE EDITING</strong> in Entando labels<br><br><ol><li> aprire un <strong>TAG</strong> tipo div p span... </li><li> aggiungere al TAG la classe <strong>\'edit content\'</strong>. Nota bene che la classe <strong>\'editContentText\'</strong> viene utilizzato in caso di text area </li><li>poi aggiungere <strong>data-content-id="$content.getId()"</strong> </li><li>aggiungere infine l\' ID dell\'attributo (TITLE) che volete stampare scrivendo <strong>data-attr-id="TITLE"</strong> e chiudere il tag con >. Fare attenzione in quanto lattributo ID é <strong>case sensitive</strong> e deve essere lo stesso di quello usato nel prossimo step </li><li>adesso inserite la label dell\'attributo che volete stampare aggiungendo <strong>$content.TITLE.text</strong></li><li>chiudete il<atrong>TAG</strong> (div p span ...) aperto all\'inizio.</li></ol> Il risultato dovrebbe essere così:<br><br> OPEN TAG class="editContent" data-content-id="$content.getId()" data-attr-id="TITLE"><br>$content.TITLE.text<br>CLOSE TAG',
    'cms.contentmodel.form.presscontext': '(premi ctrl + spazio per aprire il menu di assistenza ai contenuti)',
    'cms.contentmodel.delete.messageprompt': 'Sei sicuro di voler rimuovere <strong>{id} ({descr})</strong>?',
    'cms.contentsettings.title': 'Content Settings',
    'cms.contentsettings.titletip': 'General settings for CMS related.',
    'cms.contentsettings.label.reloadreferences': 'Reload the references',
    'cms.contentsettings.label.reloadindexes': 'Reload the indexes',
    'cms.new': '',
    'cms.save': '',
    'cms.cancel': '',
    'cms.contents.edit.contentCategoryList': '',
    'cms.categories.expandAll': '',
    'cms.categories.collapseAll': 'l',
    'cms.join': '',
    'cms.unpublish': '',
    'cms.saveAndApprove': '',
    'cms.saveAndContinue': '',
    'cms.setContentAs': '',
    'cms.chooseAnOption': '',
    'cms.contents.title': '',
    'cms.contents.edit.title': '',
    'cms.contents.edit.info': '',
    'cms.contents.edit.groups': '',
    'cms.contents.edit.groups.ownerGroup.label': '',
    'cms.contents.edit.groups.ownerGroup.button': '',
    'cms.contents.edit.groups.joinGroup.label': '',
    'cms.contents.edit.categories': '',
    'category.tree': '',
    'cms.contents.edit.groups.ownerGroup.tooltip': '',
    'cms.contents.edit.tip': '',
    'cms.contents.edit.contentType.label': '',
    'cms.contents.edit.contentDescription.label': '',
    'cms.contents.edit.contentDescription.tooltip': '',
    'cms.contents.edit.contentDescription.placeholder': '',
    'cms.contents.edit.version.label': '',
    'cms.contents.edit.version.creator': '',
    'cms.contents.edit.version.modifier': '',
    'cms.stickySave.lastAutoSave': '',
    'cms.stickySave.status': '',
    'cms.contents.edit.titletip': '',
    'cms.contents.edit.contentAttributes': '',
    'validateForm.elements': 'inserire un valore tipo \'key1=value1,key2=value2,key3=value3\'',
    'validateForm.element': 'inserire un valore tipo \'lable1,lable2,lable3\'',
    'validateForm.element.code': 'Il Codice deve essere  3 lettere maiuscole',
    'validateForm.required': 'campo obbligatorio',
    'validateForm.maxLength': 'deve essere al massimo {max} caratteri',
    'validateForm.minLength': 'deve essre almeno {min} caratteri',
    'validateForm.number': 'Deve essere un numero',
    'validateForm.minValue': 'Deve essere minore {min}',
    'validateForm.maxValue': 'Deve essre maggiore {max}',
    'validateForm.email': 'Indirizzo email non valido!',
    'validateForm.alphaNumeric': 'Solo caratteri alfanumerici',
    'validateForm.widgetCode': '{name} contiene caratteri non consentiti. Usare solo caratteri alfanumerici o undescore _',
    'validateForm.passwordNotMatch': 'Il valore di Conferma non coincide col valore della Password',
    'validateForm.code': 'Codice contiene caratteri non validi. Usare solo caratteri alfanumerici o l\'undescore \'_\'.',
  },
};
