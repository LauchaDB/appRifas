import { useState } from 'react';

export default function ModalNombre({ visible, onClose }) {
    const [inputText, setInputText] = useState('');
  
    if (!visible) {
      return null;
    }
  
    function handleInputChange(event) {
      setInputText(event.target.value);
    }
  
    function handleButtonClick() {
      onClose(inputText);
    }

    function handleModalClose() {
      const modal = document.querySelector('.modal');
      modal.style.display = 'none';
    }    
  
    return (
      <div className="modal">
        <div className="modal-content">
          <input type="text" value={inputText} onChange={handleInputChange} />
          <button onClick={handleButtonClick}>ok</button>
        </div>
      </div>
    );
  }
  