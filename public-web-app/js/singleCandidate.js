var url = new URL(document.location.href).searchParams;
var candidate;
var listOfReports =[];

fetch('http://localhost:3333/api/candidates?id=' + url.get('id')).then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject({
        status: response.status,
        statusText: response.statusText
      });
    }
  }).then(function (data) {
    candidate = data[0];
    renderCandidate(candidate);
  }).catch(function (error) {
    console.log(error.status + ' ' + error.statusText);
  });

fetch('http://localhost:3333/api/reports?candidateId=' + url.get('id')).then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject({
        status: response.status,
        statusText: response.statusText
      });
    }
  }).then(function (data) {
    listOfReports = data
    renderReports(listOfReports);
  }).catch(function (error) {
    console.log(error.status + ' ' + error.statusText);
  });




  function renderCandidate(candidate) {
    console.log('candidate: ', candidate);
    var date = new Date(candidate.birthday);
    var formatedDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
    var img = $('<img>', {src: candidate.avatar !== '' ? candidate.avatar : 'http://via.placeholder.com/300x200', alt: 'Avatar Image'});
    $('#avatar').append(img);
    $('#name').text(candidate.name);
    $('#birthday').text(formatedDate);
    $('#email').text(candidate.email);
    $('#education').text(candidate.education);   
  }

  function renderReports(listOfReports) {
      var reportsWrapper = $('#reports-wrapper');

      for (var i = 0; i < listOfReports.length; i++) {
          var report = listOfReports[i];
          var date = new Date(report.interviewDate);
          var link = $('<a>');
          link.data('report-id', report.id);
          link.addClass('modal-opener');
          link.attr('href', '#');
          link.text('detail');

          var tr = $('<tr>');
          var tdCompany = $('<td>');
          var tdDate = $('<td>');
          var tdStatus = $('<td>');
          var tdLink = $('<td>');
          tdCompany.append(report.companyName);
          tdDate.append(date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + '.');
          tdStatus.append(report.status);
          tdLink.append(link);
          tr.append(tdCompany);
          tr.append(tdDate);
          tr.append(tdStatus);
          tr.append(tdLink);
          reportsWrapper.append(tr);

      }

  }

  $(document).on('click', '.modal-opener', function(e) {
    var id = $(this).data('report-id');

    for (let i = 0; i < listOfReports.length; i++) {
        var report = listOfReports[i];
        if (report.id === id) {
            var interview = new Date(report.interviewDate);

            $('#modal-candidate').append(report.candidateName);
            var company = $('<div>');
            company.append(report.companyName);
            $('#modal-company').append(company);
            var date = $('<div>');
            date.append(interview.getDate() + '.' + interview.getMonth() + '.' + interview.getFullYear() + '.');
            $('#modal-date').append(date);
            var phase = $('<div>');
            phase.append(report.phase);
            $('#modal-phase').append(phase);
            var status = $('<div>');
            status.append(report.status);
            $('#modal-status').append(status);
            var notes = $('<div>');
            notes.append(report.note);
            $('#modal-notes').append(notes)

            var modal = $('#more-detail-modal');
            modal.modal();
        }
        
    }
  });