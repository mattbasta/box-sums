define('edit-in-place', [], function() {

    return {
        bind: function(elem, callback) {
            var input = document.createElement('input');
            input.className = 'edit-in-place';

            var present = false;
            elem.addEventListener('click', function(e) {
                document.body.appendChild(input);
                var rect = elem.getBoundingClientRect();
                var style = getComputedStyle(elem);
                input.style.left = rect.left + 'px';
                input.style.top = rect.top + 'px';
                input.style.width = elem.clientWidth + 'px';
                input.style.height = elem.clientHeight + 'px';
                input.style.fontSize = style['font-size'];
                input.value = elem.textContent;
                input.focus();
                present = true;
            });

            function save() {
                if (!present) return;
                try {
                    input.parentNode.removeChild(input);
                    callback(input.value);
                } catch(e) {}
                present = false;
            }

            input.addEventListener('blur', save.bind('blur'));
            input.addEventListener('keyup', function(e) {
                if (e.keyCode !== 13) return;
                save();
            });
        },
    };

});
