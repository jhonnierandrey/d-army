document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email(e, email = null) {
  if(e){
    e.preventDefault();
  }

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#email-body').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  if(email){
    document.querySelector('#compose-title').innerHTML = 'Reply Email';
    // Use the original email fields to pre-load the form
    document.querySelector('#compose-recipients').value = email.sender;
    document.querySelector('#compose-subject').value = email.subject.includes('Re: ') ? email.subject : `Re: ${email.subject}`;
    document.querySelector('#compose-body').value = `\nOn ${email.timestamp} ${email.sender} wrote:\n${email.body}`;
    document.querySelector('.error-msg').innerHTML =''
  }else{
    document.querySelector('#compose-title').innerHTML = 'New Email'; 
    // Clear out composition fields
    document.querySelector('#compose-recipients').value = '';
    document.querySelector('#compose-subject').value = '';
    document.querySelector('#compose-body').value = '';
    document.querySelector('.error-msg').innerHTML =''
  }

  send_email_handler();
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#email-body').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  switch (mailbox) {
    case 'inbox':
      get_received_emails();
      break;
    case 'sent':
      get_sent_emails();
      break;
    case 'archive':
      get_archived_emails();
      break;
    default:
      console.log(`No matches.`);
  }
}

function send_email_handler(){
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()

    let recipients = document.querySelector('#compose-recipients').value;
    let subject = document.querySelector('#compose-subject').value;
    let body = document.querySelector('#compose-body').value;

    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
          recipients: recipients,
          subject: subject,
          body: body
      })
    })
    .then(response => response.json())
    .then(result => {
        // Print result
        if(result.error){
          document.querySelector('.error-msg').innerHTML = result.error;
        }else{
          localStorage.clear();
          load_mailbox('sent')
          return false;
        }
    });
  })
}

function get_sent_emails(){
  let emailView = document.querySelector('#emails-view');

  let div = document.createElement('div');
  div.className = 'mail-list';
  let list = document.createElement('ul');

  fetch('/emails/sent')
  .then(response => response.json())
  .then(emails => {
      // Print emails
      for(let i = 0; i < emails.length; i++){
        let listItem = document.createElement('li');
        listItem.addEventListener('click', () => {
          get_email_body(emails[i].id);
        }, false);
        listItem.innerHTML = `<strong>${emails[i].recipients}</strong><span>${emails[i].body}</span><span>${emails[i].timestamp}</span>`;
        list.append(listItem);
      }
  });
  
  div.append(list);
  emailView.append(div);
}

function get_received_emails(){
  let emailView = document.querySelector('#emails-view');

  let div = document.createElement('div');
  div.className = 'mail-list';
  let list = document.createElement('ul');

  fetch('/emails/inbox')
  .then(response => response.json())
  .then(emails => {
      // Print emails
      for(let i = 0; i < emails.length; i++){
        let listItem = document.createElement('li');
        listItem.addEventListener('click', () => {
          get_email_body(emails[i].id);
        }, false);
        listItem.className = emails[i].read ? 'read-mail' : 'unread-mail';
        listItem.innerHTML = `<strong>${emails[i].sender}</strong><span>${emails[i].body}</span><span>${emails[i].timestamp}</span>`;
        list.append(listItem);
      }
  });
  
  div.append(list);
  emailView.append(div);
}

function get_archived_emails(){
  let emailView = document.querySelector('#emails-view');

  let div = document.createElement('div');
  div.className = 'mail-list';
  let list = document.createElement('ul');

  fetch('/emails/archive')
  .then(response => response.json())
  .then(emails => {
      // Print emails
      for(let i = 0; i < emails.length; i++){
        let listItem = document.createElement('li');
        listItem.addEventListener('click', () => {
          get_email_body(emails[i].id);
        }, false);
        listItem.className = emails[i].read ? 'read-mail' : 'unread-mail';
        listItem.innerHTML = `<strong>${emails[i].sender}</strong><span>${emails[i].body}</span><span>${emails[i].timestamp}</span>`;
        list.append(listItem);
      }
  });
  
  div.append(list);
  emailView.append(div);
}

function get_email_body(id){
  if(id){
    fetch(`/emails/${id}`)
    .then(response => response.json())
    .then(email => {
      if(email.error){
        console.log(email.error)
      }else{
        show_email(email)
      }
    })
  }
}

function show_email(email) {
  let currentUser = document.querySelector('#user-logged-in').innerText;

  if(!email.read && (currentUser !== email.sender)){
    fetch(`/emails/${email.id}`, {
      method: 'PUT',
      body: JSON.stringify({
          read: true
      })
    })
  }

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-body').style.display = 'block';

  // create the email view
  let emailBody = document.querySelector('#email-body');

  let div;

  if(document.querySelector('#email-body')){
    div = document.querySelector('#email-body'); 
  }else{
    div = document.createElement('div');
    div.className = 'email-body';
    emailBody.append(div); 
  }

  div.innerHTML = `             
                  <p><strong>From:</strong> ${email.sender}</p>
                  <p><strong>To:</strong> ${email.recipients}</p>
                  <p><strong>Subject:</strong> ${email.subject}</p>
                  <p><strong>Timestamp:</strong> ${email.timestamp}</p>
                  <div><button class="btn btn-sm btn-outline-success" id="archive-btn"><i class="bi bi-archive"></i> Archive</button> | <button class="btn btn-sm btn-outline-info" id="reply-btn"><i class="bi bi-reply"></i> Reply</button></div>
                  <hr />
                  <p>${email.body}</p>`;

  document.querySelector('#archive-btn').addEventListener('click', () => {
    archive_mail(email.id, email.archived);
  }, false)
  
  document.querySelector('#reply-btn').addEventListener('click', () => {
    compose_email(e = '', email);
  }, false)
} 

function archive_mail(id, archived){
  fetch(`/emails/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
        archived: !archived
    })
  })
  .then(() => {
    load_mailbox('inbox');
  })
}