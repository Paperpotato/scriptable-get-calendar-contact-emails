let calByTitle = await Calendar.forEventsByTitle("GG/GC Chiropractic")

let pList = []
let patientArray = []
let container = await ContactsContainer.all()
let contacts = await Contact.all(container)

let counter = 0

let events = await CalendarEvent.today([calByTitle])
//console.log(events)

events.forEach(eventName => {
  let isInitial = eventName.title.toLowerCase().includes('initial')
  let eventNameFormatted
  let isConcession = eventName.title.toLowerCase().match(/\sc$/)
  if (isInitial || isConcession) {
    eventNameFormatted = eventName.title.match(/.*(?=\W\w*$)/)[0]
    initial = true
  } else {
    eventNameFormatted = eventName.title
  }
  let firstName = eventNameFormatted.match(/(^\w+)/)[0]
  let lastName = eventNameFormatted.match(/(?!\w+\s).*/)[0].trim()

  
  let now = eventName.startDate
  let nowDay = now.getDate()
  let nowMonth = now.getMonth() + 1
  let nowYear = now.getFullYear()
  let formattedDate = `${nowDay}\/${nowMonth}\/${nowYear}`

  contacts.forEach( contact => {
    
  if (contact.familyName === lastName.toString() && contact.givenName === firstName.toString()) {

    if (contact.phoneNumbers.length) {  
      if (!patientArray.includes(eventName.title) && !eventName.title.toLowerCase().includes('mx')) {
        
        let invoiceNumber = Math.floor(Math.random() * 10000) + 10000
        invoiceNumber = invoiceNumber.toString()
        
        let invoiceBody = isConcession ? `___________________________________\n\nTAX INVOICE/RECEIPT\nNo. ${invoiceNumber}\n\nGingin Chiro Clinic\n4 Brockman st, Gingin 6503\nABN: 62 996 529 037\nPhone: 0433 772 956\n\nDate: ${formattedDate}\nName: ${eventNameFormatted}\n\nService:\n${isInitial ? "Initial Consultation (1001): $80\nTotal: $80\nPaid today: $80" : "Standard Consultation (1005): $50\nTotal: $50\nPaid today: $50"}\nBalance: $0.00\n\nDr. Kevin Giang, Chiropractor\nProvider Number: 4892352X\n___________________________________\n` : `___________________________________\n\nTAX INVOICE/RECEIPT\nNo. ${invoiceNumber}\n\nGingin Chiro Clinic\n4 Brockman st, Gingin 6503\nABN: 62 996 529 037\nPhone: 0433 772 956\n\nDate: ${formattedDate}\nName: ${eventNameFormatted}\n\nService:\n${isInitial ? "Initial Consultation (1001): $95\nTotal: $95\nPaid today: $95" : "Standard Consultation (1005): $65\nTotal: $65\nPaid today: $65"}\nBalance: $0.00\n\nDr. Kevin Giang, Chiropractor\nProvider Number: 4892352X\n___________________________________\n`

console.log( invoiceBody)
      if (contact.emailAddresses.length != []) {
        console.log(contact.emailAddresses[0].value)
        patientArray.push(eventName.title)
        counter ++
        pList.push({
          name: eventNameFormatted,
          email: contact.emailAddresses[0].value === [] ? "cabbage.leaves@gmail.com" : contact.emailAddresses[0].value,
          emailBody: invoiceBody,
          emailSubject: `TAX INVOICE No. ${invoiceNumber} - ${eventNameFormatted}`
        })
      } else {
        console.log(`${eventName.title} email is missing and could not be pushed to list`)
      }  
        }
     }

  }
})
          console.log( 'meow')
})

console.log(counter)
//console.log(pList)

//pList.forEach( patient => {
  
//  let mail = new Mail() 
//  mail.toRecipients = [patient.email]
//  mail.subject = patient.emailSubject
//  mail.body = patient.emailBody
//  mail.preferredSendingEmailAddress = "yangchiro@gmail.com"
//  mail.send()
//})

Script.setShortcutOutput(pList)

Script.complete()
