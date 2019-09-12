export default {
  locale: 'it',
  messages: {
    'cms.title': 'CMS',
    'cms.label.name': 'Nome',
    'cms.label.edit': 'Modificare',
    'cms.label.delete': 'Elimina',
    'cms.label.back': 'Indietro',
    'cms.label.cancel': 'Cancella',
    'cms.label.save': 'Salva',
    'cms.label.close': 'Chiudi',
    'cms.label.add': 'Aggiungi',
    'cms.label.info': 'Info',
    'cms.label.reload': 'Ricarica',
    'cms.label.here': 'qui',
    'cms.label.settings': 'Impostazioni',
    'cms.label.continue': 'continue',
    'cms.label.errors': 'Errori',
    'cms.label.moveUp': 'Muovi Su',
    'cms.label.moveDown': 'Muovi Giù',
    'cms.label.chooseoption': 'Seleziona un\'opzione',
    'cms.label.fieldsRequired': 'Campi obbligatori',
    'cms.label.select': 'Scegliere...',
    'cms.label.minLength': 'Lunghezza minima',
    'cms.label.maxLength': 'Lunghezza massima',
    'cms.label.regexp': 'Espressione regolare',
    'cms.label.indexable': 'Ricercabile',
    'cms.label.mandatory': 'Obbligatorio',
    'cms.label.list': 'Lista',
    'cms.label.from': 'Da',
    'cms.label.to': 'A',
    'cms.label.equal': 'Uguale a',
    'cms.label.date.placeholder': 'gg/mm/anno',
    'cms.label.modal.confirmdelete': 'Sei sicuro di voler rimuovere {code}?',
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
    'cms.contentmodel.form.codeHelp': 'Puoi inserire caratteri, lettere maiuscole e minuscole, numeri, ed il carattere speciale _',
    'cms.contentmodel.form.htmlmodel': 'Modello HTML',
    'cms.contentmodel.form.htmlmodel.statusassist': 'l\'assistente ai contenuti è <strong>ATTIVO</strong>',
    'cms.contentmodel.form.htmlmodel.statusattrhelp': 'Aiuto Informazioni sul tipo di attributi è <strong>DISATTIVATO</strong>',
    'cms.contentmodel.form.htmlmodel.statusadminconf': 'Se si desidera modificare lo stato, è necessario impostarli nell\'area di configurazione dell\'amministratore',
    'cms.contentmodel.form.saved': 'Modello di Contenuto "{modelname}" Salvato',
    'cms.contentmodel.form.editassistant': 'Assistente per la Modifica in Linea',
    'cms.contentmodel.form.stylesheet': 'Foglio di Stile',
    'cms.contentmodel.form.editassist.dialog': 'Di seguito un esempio su come utilizzare l\'<strong>INLINE EDITING</strong> in Entando labels<br><br><ol><li> aprire un <strong>TAG</strong> tipo div p span... </li><li> aggiungere al TAG la classe <strong>\'edit content\'</strong>. Nota bene che la classe <strong>\'editContentText\'</strong> viene utilizzato in caso di text area </li><li>poi aggiungere <strong>data-content-id="$content.getId()"</strong> </li><li>aggiungere infine l\' ID dell\'attributo (TITLE) che volete stampare scrivendo <strong>data-attr-id="TITLE"</strong> e chiudere il tag con >. Fare attenzione in quanto lattributo ID é <strong>case sensitive</strong> e deve essere lo stesso di quello usato nel prossimo step </li><li>adesso inserite la label dell\'attributo che volete stampare aggiungendo <strong>$content.TITLE.text</strong></li><li>chiudete il<atrong>TAG</strong> (div p span ...) aperto all\'inizio.</li></ol> Il risultato dovrebbe essere così:<br><br> OPEN TAG class="editContent" data-content-id="$content.getId()" data-attr-id="TITLE"><br>$content.TITLE.text<br>CLOSE TAG',
    'cms.contentmodel.form.presscontext': '(premi ctrl + spazio per aprire il menu di assistenza ai contenuti)',
    'cms.contentmodel.delete.messageprompt': 'Sei sicuro di voler rimuovere <strong>{id} ({descr})</strong>?',
    'cms.contenttype.title': 'Tipi di Contenuto',
    'cms.contenttype.titletip': 'Puoi creare un tipi di contenuto qui',
    'cms.contenttype.add.label': 'Aggiungere',
    'cms.contenttype.edit.label': 'Modificare',
    'cms.contenttype.list.contentTypeNameHeader': 'Nome',
    'cms.contenttype.list.contentTypeCodeHeader': 'Codice',
    'cms.contenttype.list.contentTypeStatusHeader': 'Stato',
    'cms.contenttype.list.actionsHeader': 'Azioni',
    'cms.contenttype.list.status': 'Stato',
    'cms.contenttype.list.status.0': 'A posto. Se vuoi, ricarica',
    'cms.contenttype.list.status.1': 'Ricaricamento in corso. Aggiorna la pagina.',
    'cms.contenttype.list.status.2': 'Necessità di un ricaricamento: lancialo ora.',
    'cms.contenttype.reference.text': 'Le referenze per i seguenti Tipi di Entita\' hanno bisogno di essere ricaricate. Totale da ricaricare: {count}. ',
    'cms.contenttype.reference.reload': 'Clicca {link} per ricaricare tutti i content types.',
    'cms.contenttype.attributes.label': 'Attributi',
    'cms.contenttype.editattribute.label': 'Modificare',
    'cms.contentType.helpattributes.label': 'Dalla sezione tipi di contenuto l\'amministratore può creare nuovi tipi di dati o modificare quelli già esistenti.',
    'cms.contenttype.datatype.label': 'Tipo',
    'cms.contenttype.datatype.code.label': 'Codice',
    'cms.contenttype.form.type': 'Tipo',
    'cms.contenttype.form.code': 'Codice',
    'cms.contenttype.form.codeHelp': 'Puoi inserire caratteri, lettere maiuscole e minuscole, numeri, ed il carattere speciale _',
    'cms.contenttype.attribute.codeHelp': 'Il codice è valido solo se composto da 3 lettere maiuscole',
    'cms.contenttype.form.name': 'Nome',
    'cms.contenttype.form.role': 'Ruolo',
    'cms.contenttype.form.roles': 'Ruoli',
    'cms.contenttype.form.mandatory': 'Obbligatorio',
    'cms.contenttype.form.filter': 'Filtro',
    'cms.contenttype.form.actions': 'Azioni',
    'cms.contenttype.form.filterList': 'Può essere usato come filtro nelle liste',
    'cms.contenttype.alert.created': 'tipo di contenuto creato con successo',
    'cms.contenttype.attribute.edit.title': 'Modificare',
    'cms.contenttype.enumeratorStaticItems': 'Elementi',
    'cms.contenttype.enumeratorStaticItems.help': 'Inserisci una configuration tipo \'lable1,lable2,lable3\'',
    'cms.contenttype.enumeratorStaticItemsMap.help': 'Inserisci una configuration tipo \'key1=value1,key2=value2,key3=value3\'',
    'cms.contenttype.enumeratorStaticItemsSeparator': 'Separatore',
    'cms.contenttype.enumeratorExtractorBean': 'Estrattore del bean name',
    'cms.contenttype.ognl.validation': 'Validazion - OGNL',
    'cms.contenttype.ognl.validation.help1': 'In questa sezione puoi inserire le validazioni sull\'Attributo. ',
    'cms.contenttype.ognl.validation.help2': 'L\'Espressione OGNL deve restituire un valore Boolean (true o false). Nella costruzione delle espressioni, l\'oggetto \'root\' è l\'attributo stesso (si può accedere ai metodi dell\'attributo senza specificarlo o tramite il prefisso #attribute).',
    'cms.contenttype.ognl.validation.help3': 'Sono disponibili: la mappa delle lingue del sistema (#langs) e l\'Entità a cui è associato (#entity).',
    'cms.contenttype.ognl.validation.help4': 'Inoltre per gli elementi di una Lista o di un Composito è possibile accedere al padre dell\'attributo (#parent) e per gli elementi di una Lista si ha a disposizione l\'indice (#index).',
    'cms.contenttype.ognl.expression': 'OGNL Expression ',
    'cms.contenttype.apply.expression': 'Usa l\'espressione solo se l\'attributo è valorizzato',
    'cms.contenttype.ognl.validation.add.message.help': 'Si possono inserire sia un messagio d\'aiuto che un messagio di errore, oppure una chiave per collegarli alle etichette di sistema',
    'cms.contenttype.ognl.message': 'Messaggio d\'aiuto',
    'cms.contenttype.help.message': 'Messaggio d\'aiuto',
    'cms.contenttype.help.message.key': 'Chiave per il messagio d\'aiuto',
    'cms.contenttype.error.message': 'Messaggio d\'errore',
    'cms.contenttype.error.message.key': 'Chiave per il messaggio di errore',
    'cms.contenttype.labelrole.choose': 'Scegli un ruolo',
    'cms.contenttype.labelrole.assigned': 'Assigned role',
    'cms.contenttype.labelrole.noroles': 'Ruoli non disponibili o potrebbero già essere stati assegnati.',
    'cms.contenttype.label.working': 'Stai lavorando sull\'attributo:',
    'cms.contenttype.label.element.of': 'elemento di',
    'cms.contenttype.label.edit.attribute': 'Modifica : attributo - ',
    'cms.contenttype.label.edit.Monolist': 'Modifica : Monolist',
    'cms.contenttype.label.edit.List': 'Modifica : Listo',
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
    'validateForm.name.help': 'Puoi inserire un massimo di 50 caratteri, lettere maiuscole e minuscole, numeri, ed i caratteri speciali',
  },
};
