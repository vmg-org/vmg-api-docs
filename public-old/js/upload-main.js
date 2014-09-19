function s3_upload() {
  var status_elem = document.getElementById("status");

  var s3upload = new S3Upload({
    file_dom_selector: 'files',
    s3_sign_put_url: window.wfm.cnst.API_URI + '/api/storage',
    onProgress: function(percent, message) {
      status_elem.innerHTML = 'Upload progress: ' + percent + '% ' + message;
    },
    onFinishS3Put: function(public_url) {
      status_elem.innerHTML = 'Successfully uploaded to <a href="' + public_url + '">' + public_url + '</a>';
    },
    onError: function(status) {
      console.log(status);
      status_elem.innerHTML = 'Upload error: ' + status;
    }
  });
}

(function() {
  var input_element = document.getElementById("files");
  input_element.onchange = s3_upload;
})();
