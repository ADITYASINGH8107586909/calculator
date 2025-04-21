const resultInput = document.getElementById('result');
        const previousOperationDiv = document.getElementById('previous-operation');
        
        function appendToDisplay(value) {
            resultInput.value += value;
        }
        
        function clearDisplay() {
            resultInput.value = '';
            previousOperationDiv.textContent = '';
        }
        
        function deleteLastChar() {
            resultInput.value = resultInput.value.slice(0, -1);
        }
        
        function calculate() {
            try {
                const expression = resultInput.value;
                previousOperationDiv.textContent = expression;
                
                // Handle percentage calculations
                let processedExpression = expression.replace(/(\d+\.?\d*)\%/g, function(match, number) {
                    return number / 100;
                });
                
                const result = eval(processedExpression);
                resultInput.value = result;
            } catch (error) {
                resultInput.value = 'Error';
                setTimeout(() => {
                    resultInput.value = '';
                }, 1500);
            }
        }
        
        // Add keyboard support
        document.addEventListener('keydown', function(event) {
            const key = event.key;
            
            if (/[0-9]/.test(key)) {
                appendToDisplay(key);
            } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '.') {
                appendToDisplay(key);
            } else if (key === '%') {
                appendToDisplay('%');
            } else if (key === 'Enter' || key === '=') {
                calculate();
            } else if (key === 'Backspace') {
                deleteLastChar();
            } else if (key === 'Escape' || key === 'c' || key === 'C') {
                clearDisplay();
            }
        });