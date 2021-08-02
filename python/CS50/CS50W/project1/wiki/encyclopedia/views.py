from django.http.response import HttpResponseRedirect
from django.shortcuts import render
from django import forms
from django.urls import reverse
from markdown2 import Markdown
import secrets

from . import util

class newEntryForm(forms.Form):
    title = forms.CharField(label='Entry title', widget=forms.TextInput(attrs={'class' : 'form-control col-md-8 col-lg-8'}))
    content = forms.CharField(widget=forms.Textarea(attrs={'class' : 'form-control col-md-8 col-lg-8', 'rows' : 10}))
    edit = forms.BooleanField(initial=False, widget=forms.HiddenInput(), required=False)

def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def entry(request, entry):
    markdowner = Markdown()
    entryPage = util.get_entry(entry)
    if entryPage is None:
        return render(request, 'encyclopedia/not-found.html', {
            'entryTitle' : entry
        })
    else:
        return render(request, 'encyclopedia/entry.html', {
            'entry' : markdowner.convert(entryPage),
            'entryTitle' : entry
        })

def search(request):
    value = request.GET.get('q','')
    # result is returning an exact match
    if util.get_entry(value) is not None:
        return HttpResponseRedirect(reverse('entry', kwargs={'entry' : value}))
    else:
        subsStringEntries = []

        for entry in util.list_entries():
            if value.upper() in entry.upper():
                subsStringEntries.append(entry)

        if not subsStringEntries:
            return render(request, 'encyclopedia/not-found.html', {
                'entryTitle' : value,
            })
        
        return render(request, 'encyclopedia/index.html', {
            'entries' : subsStringEntries,
            'search' : True,
            'value' : value
        })

def new_entry(request):
    if request.method == 'POST':
        form = newEntryForm(request.POST)
        if form.is_valid():
            title = form.cleaned_data['title']
            content = form.cleaned_data['content']
            if util.get_entry(title) is None or form.cleaned_data['edit'] is True:
                util.save_entry(title, content)
                return HttpResponseRedirect(reverse('entry', kwargs={'entry' : title}))
            else:
                return render(request, 'encyclopedia/new-entry.html', {
                    'form' : form,
                    'existing' : True,
                    'entry' : title
                })
        else:
            return render(request, 'encyclopedia/new-entry.html', {
                'form' : form,
                'existing' : False
            })
    else:
        return render(request, 'encyclopedia/new-entry.html', {
            'form' : newEntryForm(),
            'existing' : False
        })

def edit(request, entry):
    entryPage = util.get_entry(entry)
    if entryPage is None:
        return render(request, 'encyclopedia/new-entry.html', {
            'entryTitle' : entry
        })
    else:
        form = newEntryForm()
        form.fields['title'].initial = entry
        form.fields['title'].widget = forms.HiddenInput()
        form.fields['content'].initial = entryPage
        form.fields['edit'].initial = True
        return render(request, 'encyclopedia/new-entry.html', {
            'form' : form,
            'edit' : form.fields['edit'].initial,
            'entryTitle' : form.fields['title'].initial
        })

def random(request):
    entries = util.list_entries()
    randomEntry = secrets.choice(entries)
    return HttpResponseRedirect(reverse('entry', kwargs={'entry' : randomEntry}))