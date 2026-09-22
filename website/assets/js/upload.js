/**
 * Task 5 - Document Upload Challenge
 *
 * This is a simulated client-side upload system.
 * No files are actually uploaded to a server.
 */

document.addEventListener('DOMContentLoaded', () => {
  initDocumentUpload();
});

function initDocumentUpload() {
  const uploadButton = document.getElementById('upload-document-btn');
  const uploadInput = document.getElementById('document-upload');
  const uploadStatus = document.getElementById('upload-status');

  if (!uploadButton || !uploadInput || !uploadStatus) {
    return;
  }

  uploadButton.addEventListener('click', () => {
    const file = uploadInput.files[0];

    if (!file) {
      uploadStatus.textContent = 'Please select a file.';
      return;
    }

    const filename = file.name.toLowerCase();

    // Temporary validation used by the staging upload system.
    const blockedExtensions = [
      '.exe',
      '.js',
      '.php',
      '.sh'
    ];

    const isBlocked = blockedExtensions.some(ext =>
      filename.endsWith(ext)
    );

    if (isBlocked) {
      uploadStatus.textContent =
        'Upload rejected: this file type is not permitted.';
      return;
    }

    /*
     * Staging verification condition.
     *
     * The challenge intentionally contains a weak client-side
     * validation rule. Students are expected to inspect this
     * JavaScript and understand how the upload is handled.
     */
    if (filename === 'report.php.txt') {
      fetch('uploads/verification-receipt.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Verification receipt request failed.');
          }
          return response.json();
        })
        .then(data => {
          uploadStatus.innerHTML =
            '<strong>Upload accepted.</strong><br><br>' +
            'Temporary staging verification token: ' +
            '<code>' + data.token + '</code>';
        })
        .catch(() => {
          uploadStatus.textContent = 'Upload accepted for review.';
        });

      return;
    }

    uploadStatus.textContent =
      'Upload accepted for review.';
  });
}
