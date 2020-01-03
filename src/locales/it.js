export default {
  locale: 'it',
  messages: {
    'cms.title': 'CMS',
    'cms.label.name': 'Nome',
    'cms.label.edit': 'Modificare',
    'cms.label.delete': 'Elimina',
    'cms.label.download': 'Scaricare',
    'cms.label.upload': 'Caricare',
    'cms.label.back': 'Indietro',
    'cms.label.cancel': 'Cancella',
    'cms.label.save': 'Salva',
    'cms.label.saving': 'Salvataggio',
    'cms.label.savingdot': 'Salvataggio...',
    'cms.label.reloading': 'Ricarico',
    'cms.label.close': 'Chiudi',
    'cms.label.none': 'Nessuna',
    'cms.label.add': 'Aggiungi',
    'cms.label.info': 'Info',
    'cms.label.reload': 'Ricarica',
    'cms.label.here': 'qui',
    'cms.label.settings': 'Impostazioni',
    'cms.label.continue': 'continue',
    'cms.label.errors': 'Errori',
    'cms.label.moveUp': 'Muovi Su',
    'cms.label.moveDown': 'Muovi Giù',
    'cms.label.chooseoption': "Seleziona un'opzione",
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
    'cms.label.presenter.placeholder': 'Premeri INVIO per salvare le modifiche',
    'cms.label.modal.confirmdelete': 'Sei sicuro di voler rimuovere {code}?',
    'cms.label.files': 'File',
    'cms.label.images': 'Immagini',
    'cms.label.addFile': 'Aggiungi file',
    'cms.label.addFilePlural': 'Aggiungi file',
    'cms.label.dropFilesHere': 'Trascina i file qui',
    'cms.label.dragAndDrop': 'Trascina e rilascia o ',
    'cms.label.browseYourComputer': 'Sfoglia',
    'cms.label.metadata': 'Metadati',
    'cms.label.yes': 'sì',
    'cms.label.no': 'no',
    'cms.label.both': 'entrambi',
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
    'cms.contentmodel.form.nameHelp':
      'È possibile inserire fino a 50 caratteri inclusi lettere maiuscole e minuscole, numeri e caratteri speciali',
    'cms.contentmodel.form.contentTypeHelp':
      'Scegli uno dei tipi di contenuto esistenti da utilizzare per il tuo modello di contenuto',
    'cms.contentmodel.form.htmlmodel': 'Modello HTML',
    'cms.contentmodel.form.htmlmodelHelp':
      'Questa sarà la tua struttura di contenuto HTML usando gli elementi di contenuto forniti da un determinato tipo di contenuto',
    'cms.contentmodel.form.htmlmodel.statusassist':
      "l'assistente ai contenuti è <strong>ATTIVO</strong>",
    'cms.contentmodel.form.htmlmodel.statusattrhelp':
      'Aiuto Informazioni sul tipo di attributi è <strong>DISATTIVATO</strong>',
    'cms.contentmodel.form.htmlmodel.statusadminconf':
      "Se si desidera modificare lo stato, è necessario impostarli nell'area di configurazione dell'amministratore",
    'cms.contentmodel.form.saved': 'Modello di Contenuto "{modelname}" Salvato',
    'cms.contentmodel.form.editassistant': 'Assistente per la Modifica in Linea',
    'cms.contentmodel.form.stylesheet': 'Foglio di Stile',
    'cms.contentmodel.form.stylesheetHelp':
      'Fornisci un file di foglio di stile da utilizzare con il tuo modello HTML',
    'cms.contentmodel.form.editassist.dialog':
      'Di seguito un esempio su come utilizzare l\'<strong>INLINE EDITING</strong> in Entando labels<br><br><ol><li> aprire un <strong>TAG</strong> tipo div p span... </li><li> aggiungere al TAG la classe <strong>\'edit content\'</strong>. Nota bene che la classe <strong>\'editContentText\'</strong> viene utilizzato in caso di text area </li><li>poi aggiungere <strong>data-content-id="$content.getId()"</strong> </li><li>aggiungere infine l\' ID dell\'attributo (TITLE) che volete stampare scrivendo <strong>data-attr-id="TITLE"</strong> e chiudere il tag con >. Fare attenzione in quanto lattributo ID é <strong>case sensitive</strong> e deve essere lo stesso di quello usato nel prossimo step </li><li>adesso inserite la label dell\'attributo che volete stampare aggiungendo <strong>$content.TITLE.text</strong></li><li>chiudete il<atrong>TAG</strong> (div p span ...) aperto all\'inizio.</li></ol> Il risultato dovrebbe essere così:<br><br> OPEN TAG class="editContent" data-content-id="$content.getId()" data-attr-id="TITLE"><br>$content.TITLE.text<br>CLOSE TAG',
    'cms.contentmodel.form.presscontext':
      '(premi ctrl + spazio per aprire il menu di assistenza ai contenuti)',
    'cms.contentmodel.delete.messageprompt':
      'Sei sicuro di voler rimuovere <strong>{id} ({descr})</strong>?',
    'cms.contenttype.title': 'Tipi di Contenuto',
    'cms.contenttype.titletip': 'La sezione Tipi di contenuto consente all\'amministratore di aggiungere nuovi tipi di contenuto o modificare quelli già esistentiPuoi creare un tipi di contenuto qui.',
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
    'cms.contenttype.reference.text':
      "Le referenze per i seguenti Tipi di Entita' hanno bisogno di essere ricaricate. Totale da ricaricare: {count}. ",
    'cms.contenttype.reference.reload': 'Clicca {link} per ricaricare tutti i content types.',
    'cms.contenttype.attributes.label': 'Attributi',
    'cms.contenttype.editattribute.label': 'Modificare',
    'cms.contentType.helpattributes.label':
      "Dalla sezione tipi di contenuto l'amministratore può creare nuovi tipi di dati o modificare quelli già esistenti.",
    'cms.contenttype.datatype.label': 'Tipo',
    'cms.contenttype.datatype.code.label': 'Codice',
    'cms.contenttype.form.type': 'Tipo',
    'cms.contenttype.form.code': 'Codice',
    'cms.contenttype.form.codeHelp':
      'Puoi inserire caratteri, lettere maiuscole e minuscole, numeri, ed il carattere speciale _',
    'cms.contenttype.attribute.codeHelp':
      'Il codice è valido solo se composto da 3 lettere maiuscole',
    'cms.contenttype.form.name': 'Nome',
    'cms.contenttype.form.role': 'Ruolo',
    'cms.contenttype.form.roles': 'Ruoli',
    'cms.contenttype.form.mandatory': 'Obbligatorio',
    'cms.contenttype.form.filter': 'Filtro',
    'cms.contenttype.form.actions': 'Azioni',
    'cms.contenttype.form.filterList': 'Può essere usato come filtro nelle liste',
    'cms.contenttype.form.metadata.defaultContentModel': 'Modello di contenuto predefinito',
    'cms.contenttype.form.metadata.defaultContentModelLists': 'Modello di contenuto predefinito per elenchi',
    'cms.contenttype.form.metadata.viewPage': 'Pagina per la pubblicazione al volo',
    'cms.contenttype.alert.created': 'tipo di contenuto creato con successo',
    'cms.contenttype.attribute.edit.title': 'Modificare',
    'cms.contenttype.enumeratorStaticItems': 'Elementi',
    'cms.contenttype.enumeratorStaticItems.help':
      "Inserisci una configuration tipo 'lable1,lable2,lable3'",
    'cms.contenttype.enumeratorStaticItemsMap.help':
      "Inserisci una configuration tipo 'key1=value1,key2=value2,key3=value3'",
    'cms.contenttype.enumeratorStaticItemsSeparator': 'Separatore',
    'cms.contenttype.enumeratorExtractorBean': 'Estrattore del bean name',
    'cms.contenttype.ognl.validation': 'Validazion - OGNL',
    'cms.contenttype.ognl.validation.help1':
      "In questa sezione puoi inserire le validazioni sull'Attributo. ",
    'cms.contenttype.ognl.validation.help2':
      "L'Espressione OGNL deve restituire un valore Boolean (true o false). Nella costruzione delle espressioni, l'oggetto 'root' è l'attributo stesso (si può accedere ai metodi dell'attributo senza specificarlo o tramite il prefisso #attribute).",
    'cms.contenttype.ognl.validation.help3':
      "Sono disponibili: la mappa delle lingue del sistema (#langs) e l'Entità a cui è associato (#entity).",
    'cms.contenttype.ognl.validation.help4':
      "Inoltre per gli elementi di una Lista o di un Composito è possibile accedere al padre dell'attributo (#parent) e per gli elementi di una Lista si ha a disposizione l'indice (#index).",
    'cms.contenttype.ognl.expression': 'OGNL Expression ',
    'cms.contenttype.apply.expression': "Usa l'espressione solo se l'attributo è valorizzato",
    'cms.contenttype.ognl.validation.add.message.help':
      "Si possono inserire sia un messagio d'aiuto che un messagio di errore, oppure una chiave per collegarli alle etichette di sistema",
    'cms.contenttype.ognl.message': "Messaggio d'aiuto",
    'cms.contenttype.help.message': "Messaggio d'aiuto",
    'cms.contenttype.help.message.key': "Chiave per il messagio d'aiuto",
    'cms.contenttype.error.message': "Messaggio d'errore",
    'cms.contenttype.error.message.key': 'Chiave per il messaggio di errore',
    'cms.contenttype.labelrole.choose': 'Scegli un ruolo',
    'cms.contenttype.labelrole.assigned': 'Assigned role',
    'cms.contenttype.labelrole.noroles':
      'Ruoli non disponibili o potrebbero già essere stati assegnati.',
    'cms.contenttype.label.working': "Stai lavorando sull'attributo:",
    'cms.contenttype.label.element.of': 'elemento di',
    'cms.contenttype.label.edit.attribute': 'Modifica : attributo - ',
    'cms.contenttype.label.edit.Monolist': 'Modifica : Monolist',
    'cms.contenttype.label.edit.List': 'Modifica : Listo',
    'cms.contentsettings.title': ' Impostazione Contenuti',
    'cms.contentsettings.titletip':
      "Dalla sezione CONFIGURAZIONE CONTENUTI l'amministratore puó ricaricare le referenze e gli indici dei contenuti, selezionare l'editor di testo e configurare il mapping dei metadata delle risorse con parametri degli attributi risorsa",
    'cms.contentsettings.label.reloadreferences': 'Ricarica le referenze',
    'cms.contentsettings.label.reloadindexes': 'Ricarica gli indici',
    'cms.contentsettings.label.reloadstatus': 'Pronta',
    'cms.contentsettings.label.reloadstatus.0': 'Pronta',
    'cms.contentsettings.label.reloadstatus.1': 'Ricarico',
    'cms.contentsettings.label.reloadstatus.2': 'Errore',
    'cms.contentsettings.label.reloadstatus.remark.success':
      "L'ultimo ricaricamento, in data {date}, ha avuto esisto positivo.",
    'cms.contentsettings.label.reloadstatus.remark.failed':
      "L'ultimo ricaricamento, in data {date}, ha avuto esisto negativo",
    'cms.contentsettings.cropratios.heading': 'Impostazioni Dimensioni di ritaglio immagine',
    'cms.contentsettings.cropratios.form.title': 'Aggiungi dimensione di ritaglio',
    'cms.contentsettings.ratio.added.success': 'Rapporto di ritaglio aggiunto correttamente',
    'cms.contentsettings.ratio.deleted.success': 'Rapporto di ritaglio eliminato correttamente',
    'cms.contentsettings.ratio.updated.success': 'Rapporto di ritaglio aggiornato correttamente',
    'cms.contentsettings.label.resourcemap': 'Resource Metadata Mapping',
    'cms.contentsettings.form.addmetadata': 'Add Metadata',
    'cms.contentsettings.form.key': 'Chiave',
    'cms.contentsettings.form.mapping': 'Mapping',
    'cms.contentsettings.form.help': 'In questa sezione puoi aggiungere un nuovo metadata',
    'cms.contentsettings.form.metadatamapping': 'Metadata Mapping',
    'cms.contentsettings.form.metadatamapping.help':
      "Lista parametri (in CSV) delle relazioni tra Metadata Risorsa e Parametro '{key}' in fase di associazione risorsa immagine ad attributo contenuto",
    'cms.contentsettings.metadata.infoDeleted': '{name} rimosso',
    'cms.new': 'Nuova',
    'cms.save': 'Salva',
    'cms.cancel': 'Cancella',
    'cms.contents.edit.contentCategoryList': 'Elenco Delle Dategorie Di Contenuti',
    'cms.categories.expandAll': 'Espandi Tutto',
    'cms.categories.collapseAll': 'Comprimi Tutto',
    'cms.join': 'Aderire',
    'cms.unpublish': 'Non Pubblicato',
    'cms.saveAndApprove': 'Salva e Approva',
    'cms.saveAndContinue': 'Salva e Continua',
    'cms.setContentAs': 'Imposta Contenuto Come',
    'cms.chooseAnOption': 'Scegliere un\'opzione',
    'cms.contents.title': 'Contenuto',
    'cms.contents.edit.title': 'Modificare',
    'cms.contents.edit.info': 'Info',
    'cms.contents.edit.groups': 'Gruppi',
    'cms.contents.edit.groups.ownerGroup.label': 'Gruppo Proprietario',
    'cms.contents.edit.groups.ownerGroup.button': 'Imposta Gruppo',
    'cms.contents.edit.groups.joinGroup.label': 'Unirsi al Gruppo',
    'cms.contents.edit.categories': 'Categorie',
    'category.tree': 'Categorie Albero',
    'cms.contents.edit.groups.ownerGroup.tooltip': 'Dovresti impostare il gruppo principale in questo momento, altrimenti alcune cose diventeranno imprecise.',
    'cms.contents.edit.tip': '* Campi richiesti',
    'cms.contents.edit.contentType.label': 'Tipo di Contenuto',
    'cms.contents.edit.contentDescription.label': 'Descrizione del Contenuto',
    'cms.contents.edit.contentDescription.tooltip': 'Fornisci una descrizione o userò il titolo se disponibile.',
    'cms.contents.edit.contentDescription.placeholder': 'Le descrizioni ti aiutano ad archiviare, ordinare e trovare contenuti',
    'cms.contents.edit.version.label': 'Versione',
    'cms.contents.edit.version.creator': 'creato da',
    'cms.contents.edit.version.modifier': 'modificato da',
    'cms.stickySave.lastAutoSave': 'L\'ultimo salvataggio automatico è stato:',
    'cms.stickySave.status': 'Stato',
    'cms.contents.edit.titletip': 'La sezione INDICE ti consente di gestire i contenuti esistenti, accedere all\'elenco dei contenuti, aggiungere nuovi contenuti. Puoi anche approvare, sospendere o eliminare i contenuti. In Entando, un contenuto è un elemento strutturato che rappresenta un insieme di informazioni costruite utilizzando gli attributi del contenuto.',
    'cms.contents.edit.contentAttributes': 'Attributi del Contenuto',
    'cms.contents.edit.contentAttributes.language': 'Gli attributi possono essere modificati solo nella sezione della lingua predefinita',
    'cms.menu.contents': 'Contenuto',
    'cms.contents.tip': 'La sezione INDICE ti consente di gestire i contenuti esistenti, accedere all\'elenco dei contenuti, aggiungere nuovi contenuti. Puoi anche approvare, sospendere o eliminare i contenuti. In Entando, un contenuto è un elemento strutturato che rappresenta un insieme di informazioni costruite utilizzando gli attributi del contenuto.',
    'cms.contents.quickSearchPlaceHolder': 'Cerca Contenuto',
    'cms.contents.advancedFilters': 'Filtri Avanzati',
    'cms.contents.contentType': 'Tipo di Contenuto',
    'cms.contents.group': 'Gruppo',
    'cms.contents.statusMain': 'Stato',
    'cms.contents.published': 'Pubblicato',
    'cms.contents.toUpdate': 'Aggiornare',
    'cms.contents.toReview': 'Revisionare',
    'cms.contents.unpublished': 'Inedito',
    'cms.contents.restriction': 'Restrizioni',
    'cms.contents.open': 'Aperto',
    'cms.contents.restricted': 'Limitato',
    'cms.contents.showMe': 'Fammi vedere',
    'cms.contents.allContents': 'Tutti i Contenuti',
    'cms.contents.byMe': 'Contenuti Creati da Me',
    'cms.contents.search': 'Ricerca',
    'cms.contents.onlyMine': 'Solo Mio',
    'cms.contents.draft': 'Bozza',
    'cms.contents.toApprove': 'Pronto',
    'cms.contents.approved': 'Approvato',
    'cms.contents.rejected': 'Respinto',
    'cms.contents.downloadAs': 'Scarica come',
    'cms.contents.addContent': 'Aggiungi Contenuto',
    'cms.contents.columns': 'Colonne',
    'cms.contents.manageVersion': 'Gestisci Versioni',
    'cms.contents.joinCategory': 'Unisciti alla categoria',
    'cms.contents.chooseJoiningCategories': 'Scegli le categorie a cui vuoi unirti al {number} contenuto selezionato!',
    'cms.contents.joinCategoriesTip': 'L\'azione cambierà la versione bozza dei contenuti selezionati, non la versione online. Per visualizzare le modifiche nella versione online, è necessario approvare le modifiche.',
    'cms.contents.seeOnlineVersion': 'Vedi Versione Online',
    'cms.contents.clone': 'Clone',
    'cms.contents.cloned': 'Clonato',
    'cms.contents.publish': 'Pubblicare',
    'cms.contents.unpublish': 'Non Pubblicato',
    'cms.contents.details': 'Dettagli',
    'cms.contents.reloadReferences': 'Ricarica Riferimenti',
    'cms.contents.categoriesToAdd': 'Seleziona le Categorie da Aggiungere',
    'cms.contents.categoriesUpdated': 'Categorie Aggiornate',
    'cms.contents.delete': 'Elimina',
    'cms.contents.description': 'Nome',
    'cms.contents.firstEditor': 'Creato da',
    'cms.contents.lastModified': 'Ultima Modifica',
    'cms.contents.typeCode': 'Tipo',
    'cms.contents.created': 'Data di Creazione',
    'cms.contents.actions': 'Azioni',
    'cms.contents.selectAll': 'Seleziona Tutto',
    'cms.contents.mainGroup': 'Gruppo Proprietario',
    'cms.contents.groups': 'Unisciti ai Gruppi',
    'cms.contents.onLine': 'Stato',
    'cms.contents.status': 'Restrizioni',
    'cms.contents.selectContentType': 'Seleziona un Tipo di Contenuto',
    'cms.contents.selectGroup': 'Seleziona un Gruppo',
    'cms.contents.selectedContents': 'Hai selezionato {number} contenuti, puoi',
    'cms.contents.saved': 'Salvato',
    'cms.assets.title': 'Risorse Digitali',
    'cms.assets.tip': 'La sezione ASSET DIGITALI consente di gestire risorse, immagini e allegati esistenti, accedere all\'elenco delle risorse, aggiungere o eliminare risorse. Immagini e allegati possono essere caricati in un archivio di risorse digitali e utilizzati nei contenuti.',
    'cms.assets.list.preview': 'Anteprima',
    'cms.assets.list.name': 'Nome',
    'cms.assets.list.type': 'Tipo',
    'cms.assets.list.apply': 'Applicare',
    'cms.assets.list.uploadedBy': 'Caricato da',
    'cms.assets.list.uploadedAt': 'Caricato a',
    'cms.assets.list.group': 'Gruppo',
    'cms.assets.list.categories': 'Categorie',
    'cms.assets.list.used': 'Usato',
    'cms.assets.list.actions': 'Azioni',
    'cms.assets.list.all': 'Tutti',
    'cms.assets.list.image': 'Immagini',
    'cms.assets.list.file': 'Allegati',
    'cms.assets.list.filterBy': 'Search',
    'cms.assets.list.activeFilters': 'Filtri Attivi',
    'cms.assets.list.clearAll': 'Cancella Tutto',
    'cms.assets.list.nothingFound': 'Nessun articolo trovato',
    'cms.assets.list.of': 'di',
    'cms.assets.list.items': 'elementi',
    'cms.assets.label.imagedetails': 'Dettagli Dell\'immagine',
    'cms.assets.label.attachdetails': 'Dettagli Dell\'allegato',
    'cms.datetimepicker.label.hours': 'Scegli un\'ora',
    'cms.datetimepicker.label.minutes': 'Scegli un minuto',
    'cms.datetimepicker.label.seconds': 'Scegli un secondo',
    'cms.assets.form.name': 'Nome',
    'cms.assets.form.categories': 'Categorie',
    'cms.assets.form.desc': 'Descrizione',
    'cms.assets.form.group': 'Gruppo',
    'cms.assets.form.filetype': 'Tipo',
    'cms.assets.form.dimension': 'Dimensione',
    'cms.assets.form.title': 'Titolo',
    'cms.assets.form.filename': 'Nome del file',
    'cms.assets.form.details': 'Dettagli',
    'cms.assets.form.size.orig': 'Originale',
    'cms.assets.form.size.sm': 'Piccolo',
    'cms.assets.form.size.md': 'Medio',
    'cms.assets.form.size.lg': 'Grande',
    'cms.assets.form.aspectfree': 'Libero',
    'cms.assets.form.x': 'X',
    'cms.assets.form.y': 'Y',
    'cms.assets.form.width': 'Width',
    'cms.assets.form.height': 'Height',
    'cms.assets.form.rotate': 'Ruotare',
    'cms.assets.form.xscale': 'Scale X',
    'cms.assets.form.yscale': 'Scale Y',
    'cms.assets.form.scale': 'Flip',
    'cms.assets.form.crop': 'Ritaglia',
    'cms.assets.form.move': 'Mossa',
    'cms.assets.form.pan': 'Pan',
    'cms.assets.form.zoom': 'Zoom',
    'cms.assets.form.cropsave': 'Applicare',
    'cms.assets.form.cropcancel': 'Ritornare',
    'cms.assets.form.updated': '"{name}" dell\'asset aggiornato.',
    'cms.assets.form.uploaded': 'Asset "{name}" caricato.',
    'cms.assets.errors.failedToUpload': 'Impossibile caricare una risorsa, si è verificato un errore del server.',
    'validateForm.elements': "inserire un valore tipo 'key1=value1,key2=value2,key3=value3'",
    'validateForm.element': "inserire un valore tipo 'lable1,lable2,lable3'",
    'validateForm.element.code': 'Il Codice deve essere  3 lettere maiuscole',
    'validateForm.required': 'campo obbligatorio',
    'validateForm.maxLength': 'deve essere al massimo {max} caratteri',
    'validateForm.minLength': 'deve essre almeno {min} caratteri',
    'validateForm.number': 'Deve essere un numero',
    'validateForm.minValue': 'Deve essere minore {min}',
    'validateForm.maxValue': 'Deve essre maggiore {max}',
    'validateForm.email': 'Indirizzo email non valido!',
    'validateForm.alphaNumeric': 'Solo caratteri alfanumerici',
    'validateForm.widgetCode':
      '{name} contiene caratteri non consentiti. Usare solo caratteri alfanumerici o undescore _',
    'validateForm.passwordNotMatch': 'Il valore di Conferma non coincide col valore della Password',
    'validateForm.code.max10digits': 'Il codice contiene caratteri non validi o ha raggiunto i requisiti massimi. Sono ammessi solo 10 o meno caratteri numerici.',
    'validateForm.code': 'Codice contiene caratteri non validi. Usare solo caratteri alfanumerici o l\'undescore \'_\'.',
    'validateForm.name.help': 'Puoi inserire un massimo di 50 caratteri, lettere maiuscole e minuscole, numeri, ed i caratteri speciali',
  },
};
