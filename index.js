//nav bar
$(document).ready(function() {
    var selectorA = selectorB = selectorC = selectorD = '';

    function animation(a, b, c, d) {
        $('.fold-icon').css('visibility', 'hidden');
        $(a).css('display', 'none');

        if(b == '#login') {$(b).css({'background-color':'#2e68aa', 'color':'white'});}
        if(b == '#sign-up') {$(b).css({'background-color':'#73082f', 'color':'white'});}

        $(c).slideToggle(300);

        if($(d).css('color') == 'rgb(255, 255, 255)') {
            $(d).css({'background-color':'white', 'color':'#34352c'});
            setTimeout(function() {$('.fold-icon').css('visibility', 'visible');}, 300)
        } else {
            function changeColor() {
                if(d == '#login') {$(d).css({'background-color':'#2e68aa', 'color':'white'});}
                if(d == '#sign-up') {$(d).css({'background-color':'#73082f', 'color':'white'});}
            }

            setTimeout(changeColor, 300);
        }
    }

    $('#login, #login-button, .login .fold-icon').click(function() {
        selectorA = '.sign-up';
        selectorB = '#sign-up';
        selectorC = '.login';
        selectorD = '#login';

        animation(selectorA, selectorB, selectorC, selectorD);
    });
    
    $('#sign-up, #sign-up-button, .sign-up .fold-icon').click(function() {
        selectorA = '.login';
        selectorB = '#login';
        selectorC = '.sign-up';
        selectorD = '#sign-up';

        animation(selectorA, selectorB, selectorC, selectorD);
    });
});

//button style transition
$(document).ready(function() {
    function animation(element, keyframes) {
        element.css({'animation-name':keyframes, 'animation-duration':'0.3s'});

        function removeAnimation() {
            element.css({'animation-name':'', 'animation-duration':''});
        }
        setTimeout(removeAnimation, 301);
    }

    $('#login-button, #sign-up-button').click(function() {
        animation($(this), 'login-button-color');
    });
});

//validation: sign up form
$(document).ready(function() {
    $('#sign-up-form input').each(function() {
        $(this).on({
            focusin: function() {
                if($(this).val() != '') {
                    $(this).next().css('visibility', 'visible');
                }

                var color = $(this).css('border-color');
                $(this).css({'box-shadow':'0.05rem 0.05rem 0.2rem ' + color + ', -0.05rem -0.05rem 0.2rem ' + color});
            },
            focusout: function() {
                $(this).css('box-shadow', '');
                
                setTimeout(function(element) {
                    element.next().css('visibility', 'hidden');
                }, 10, $(this));
            },
            keyup: function() {
                $(this).siblings('p').children().remove(); //remove the duplicate caution

                function inputValidStyle(element) {
                    element.css({'border-color':'#34352c', 'box-shadow':'0.05rem 0.05rem 0.2rem #34352c, -0.05rem -0.05rem 0.2rem #34352c'});
                    element.parent().css({'background-image':'url(icon/right_icon.svg)', 'background-repeat':'no-repeat', 'background-position':'calc(87.5% + 1.5rem) 9.3%', 'background-size':'auto 1.5rem'});
                }
                function inputInvalidStyle(element) {
                    element.css({'border-color':'#cc0033', 'box-shadow':'0.05rem 0.05rem 0.2rem #cc0033, -0.05rem -0.05rem 0.2rem #cc0033'});
                    element.parent().css({'background-image':'url(icon/wrong_icon.svg)', 'background-repeat':'no-repeat', 'background-position':'calc(87.5% + 1.5rem) 9.3%', 'background-size':'auto 2rem'});
                }
                function enableButton() {
                    $('#sign-up-button').css('opacity', '1');
                    $('#sign-up-button').removeAttr('disabled');
                }
                function disableButton() {
                    $('#sign-up-button').css('opacity', '0.5');
                    $('#sign-up-button').attr('disabled');
                }

                if($(this).val() == '') {
                    $(this).css({'border-color':'#34352c', 'box-shadow':'0.05rem 0.05rem 0.2rem #34352c, -0.05rem -0.05rem 0.2rem #34352c'});
                    $(this).next().css('visibility', 'hidden');
                    $(this).parent().css({'background-image':'', 'background-repeat':'', 'background-position':'', 'background-size':''});
                    
                    if($(this).attr('id') == 'password' && $(this).parent().next().children('input').val() != '') {
                        inputInvalidStyle($(this).parent().next().children('input'));
                        $(this).parent().next().children('input').css('box-shadow', '');
                    }

                    disableButton();
                } else {
                    $(this).next().css('visibility', 'visible');

                    function duplicateOnServer(value, element) {
                        $.ajax(
                            {
                                async: false,
                                type: 'GET',
                                url: 'server_sign_up_validation.php',
                                data: {'inputData': value},

                                success: function(result) {
                                    var caution = "<span style='color: #cc0033;'> It has been used, please change another one.</span>";

                                    switch(result) {
                                        case 'no duplicate':
                                            inputValidStyle(element);
                                            break;
                                        case 'exist':
                                            inputInvalidStyle(element);
                                            element.siblings('p').append(caution);
                                            break;
                                        default:
                                            alert('Something went wrong, please try again later.');
                                    }
                                }
                            }
                        );
                    }
                    function validation(element) {
                        var id = element.attr('id');
                        var inputValue = element.val();
                        var pattern = '';
                        
                        switch(id) {
                            case 'username':
                                pattern = /^\w{1,16}$/;
                                
                                if(!pattern.test(inputValue)) {
                                    inputInvalidStyle(element);
                                    break;
                                } else {
                                    duplicateOnServer(inputValue, element);
                                    break;
                                }
                            case 'email':
                                pattern = /^(?=.{5,32}$)\S+@\S+\.\S+$/;
                                
                                if(!pattern.test(inputValue)) {
                                    inputInvalidStyle(element);
                                    break;
                                } else {
                                    duplicateOnServer(inputValue, element);
                                    break;
                                }
                            case 'password':
                                pattern = /^(?=[^a-z]*?[a-z])(?=[^A-Z]*?[A-Z])(?=\D*?\d)(?=[^`~!@#\$%\^&\*\(\)_\+\-=\[\]\|\}\{;\'":\/\.,<>\?]*?[`~!@#\$%\^&\*\(\)_\+\-=\[\]\|\}\{;\'":\/\.,<>\?]).{6,32}$/;
                                
                                if(!pattern.test(inputValue)) {
                                    if(element.parent().next().children('input').val() != '') {
                                        inputInvalidStyle(element.parent().next().children('input'));
                                        element.parent().next().children('input').css('box-shadow', '');
                                    }

                                    inputInvalidStyle(element);
                                    break;
                                } else {
                                    if(element.parent().next().children('input').val() != '') {
                                        if(inputValue != element.parent().next().children('input').val()) {
                                            inputInvalidStyle(element.parent().next().children('input'));
                                            element.parent().next().children('input').css('box-shadow', '');
                                        } else {
                                            inputValidStyle(element.parent().next().children('input'));
                                            element.parent().next().children('input').css('box-shadow', '');
                                        }
                                    }

                                    inputValidStyle(element);
                                    break;
                                }
                            default:
                                pattern = /^(?=[^a-z]*?[a-z])(?=[^A-Z]*?[A-Z])(?=\D*?\d)(?=[^`~!@#\$%\^&\*\(\)_\+\-=\[\]\|\}\{;\'":\/\.,<>\?]*?[`~!@#\$%\^&\*\(\)_\+\-=\[\]\|\}\{;\'":\/\.,<>\?]).{6,32}$/;
                                
                                if(!pattern.test(inputValue)) {
                                    inputInvalidStyle(element);
                                } else {
                                    if(inputValue != element.parent().prev().children('input').val()) {
                                        inputInvalidStyle(element);
                                    } else {
                                        inputValidStyle(element);
                                    }
                                }
                        }

                        var sign = 0;
                        for(var i = 0; i < 4; i++) {
                            if($($('#sign-up-form div')[i]).css('background-image') == 'url("http://localhost/icon/right_icon.svg")') {
                                sign++;
                            }

                            if(sign == 4) {
                                enableButton();
                            } else {
                                disableButton();
                            }
                        }
                    }

                    validation($(this));
                }
            }
        });
    });
});

//prevent users pasting/cutting
$(document).ready(function() {
    $('#login-form, #sign-up-form').each(function() {
        $(this).on('paste cut', function(event) {
            event.preventDefault();
        });
    });
});

//reset: sign up form
$(document).ready(function() {
    $('#sign-up-form i').each(function() {
        $(this).click(function() {
            $(this).prev().val('');
            $(this).prev().css('border-color', '#34352c');
            $(this).parent().css({'background-image':'', 'background-repeat':'', 'background-position':'', 'background-size':''});
            $(this).siblings('p').children().remove(); //remove the duplicate caution
            $(this).prev().focus();

            function disableButton() {
                $('#sign-up-button').css('opacity', '0.5');
                $('#sign-up-button').attr('disabled');
            }
            function inputInvalidStyle(element) {
                element.css({'border-color':'#cc0033', 'box-shadow':'0.05rem 0.05rem 0.2rem #cc0033, -0.05rem -0.05rem 0.2rem #cc0033'});
                element.parent().css({'background-image':'url(icon/wrong_icon.svg)', 'background-repeat':'no-repeat', 'background-position':'calc(87.5% + 1.5rem) 9.3%', 'background-size':'auto 2rem'});
            }

            disableButton();

            if($(this).prev().attr('id') == 'password' && $(this).parent().next().children('input').val() != '') {
                inputInvalidStyle($(this).parent().next().children('input'));
                $(this).parent().next().children('input').css('box-shadow', '');
            }
        });
    });
});

//AJAX: sign up
$(document).ready(function() {
    $('#sign-up-button').click(function(event) {
        event.preventDefault();

        var array = [];
        for(var i = 0; i < 3; i++) {
            array[i] = $($('#sign-up-form input')[i]).val();
        }

        $.ajax(
            {
                async: false,
                type: 'POST',
                url: 'server_sign_up.php',
                data: {'username': array[0], 'email': array[1], 'password': array[2]},
                
                success: function(result) {
                    if(result == 'success') {
                        //HERE!
                    } else {
                        alert('Something went wrong, please try again later.');
                    }
                }
            }
        );
    });
});