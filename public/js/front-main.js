//chargement du document(ready)
$(function(){
    //set animation for intro heading onload '/' path
    $('#intro .headings').css('opacity', '1');
    //clear select field on load
    $('select').val('');
});
// --------------------------------------------------------------------------------------------------------------

// nav bar start
$('.links-list a.drop-menu').click(function(){
    $('.rech-menu-container .rech-menu').slideToggle();
});

// show or hide menu when menu button is clicked(under 992px)
$('#nav .inner .menu-button .menu-btn').click(function(){
        $('#nav .inner .links-list').toggleClass('active-slide-menu');
});
// nav bar end
// --------------------------------------------------------------------------------------------------------------
// dashboard side nav start

// etudiants sub menu
$('.etd-link').click(function(){
    $('.nav-content .sub-etudiants').slideToggle();
});
//modules sub menu
$('.mdl-link').click(function(){
    $('.nav-content .sub-modules').slideToggle();
});
//show side nav 
$('.show-btn').click(function(){
    $('.side-nav').attr('id', 'show-nav');
});
//hide side nav
$('.side-nav .hide-btn .x-btn').click(function(){
    $('.side-nav').removeAttr('id');
});

// dashboard side nav end
// --------------------------------------------------------------------------------------------------------------
// crud and search forms 'etudiant' start
//slide forms animation
$('.ajouter-etudiant-btn').click(function(){
    $('.nouv-etudiant').slideToggle();
    $('.modif-etudiant').slideUp();
    $('.supp-etudiant').slideUp();
    $('.rech-etudiant').slideUp();
});
$('.modifier-etudiant-btn').click(function(){
    $('.modif-etudiant').slideToggle();
    $('.nouv-etudiant').slideUp();
    $('.supp-etudiant').slideUp();
    $('.rech-etudiant').slideUp();
});
$('.supprimer-etudiant-btn').click(function(){
    $('.supp-etudiant').slideToggle();
    $('.modif-etudiant').slideUp();
    $('.nouv-etudiant').slideUp();
    $('.rech-etudiant').slideUp();
});
$('.rechercher-etudiant-btn').click(function(){
    $('.rech-etudiant').slideToggle();
    $('.modif-etudiant').slideUp();
    $('.nouv-etudiant').slideUp();
    $('.supp-etudiant').slideUp();
});
    // 'modifier' button
    //effacer les champs
    $('.modif-etudiant .effacer-btn-etd').click(function(){
        $('.modif-etudiant-form input:eq(0)').val('');
        $('.modif-etudiant-form input:eq(1)').val('');
        $('.modif-etudiant-form input:eq(2)').val('');
        $('.modif-etudiant-form input:eq(3)').val('');
        $('.modif-etudiant-form input:eq(4)').val('');
        $('.modif-etudiant-form input:eq(5)').val('');
        $('.modif-etudiant-form select:eq(0)').val('');
        $('.modif-etudiant-form select:eq(1)').val('');
    });
    // load 'etudiant' infos on click 
    $('.modif-etudiant .charger-btn-etd').click(function(){
        var code_etudiant = $('.modif-etudiant-form input:eq(0)').val().trim();
        if( code_etudiant == '')
        {
            console.log('coedEtudiant vide');
            return;
        }
        else
        {
            $('.table-etudiants tr').each(function(){
                var code_table = $(this).find('td:eq(0)').html();
                if(code_etudiant === code_table){
                    $('.modif-etudiant-form input:eq(1)').val(($(this).find('td:eq(1)').html()));
                    $('.modif-etudiant-form input:eq(2)').val(($(this).find('td:eq(2)').html()));
                    $('.modif-etudiant-form input:eq(3)').val(($(this).find('td:eq(3)').html()));
                    $('.modif-etudiant-form select:eq(0)').val(($(this).find('td:eq(4)').html()));
                    $('.modif-etudiant-form select:eq(1)').val(($(this).find('td:eq(5)').html()));
                    $('.modif-etudiant-form input:eq(4)').val(($(this).find('td:eq(6)').html()));
                    $('.modif-etudiant-form input:eq(5)').val(($(this).find('td:eq(7)').html()));
                    return;
                }
            });
        }    
        
    });
    // rechercher 'etudiant'
    $('.rech-etudiant-input').on('keyup', function(){
        var codeEtd = $(this).val().toUpperCase();
        $('.table-etudiants tr:gt(0)').filter(function(){
            $(this).toggle($(this).text().toUpperCase().indexOf(codeEtd) > -1);//there is an index in table where values match
        });
    });
// crud and search forms 'etudiant' end
// --------------------------------------------------------------------------------------------------------------
// crud forms 'filiere' start
//slide forms animation
$('.ajouter-filiere-btn').click(function(){
    $('.nouv-filiere').slideToggle();
    $('.modif-filiere').slideUp();
    $('.supp-filiere').slideUp();
});
$('.modifier-filiere-btn').click(function(){
    $('.modif-filiere').slideToggle();
    $('.nouv-filiere').slideUp();
    $('.supp-filiere').slideUp();
});
$('.supprimer-filiere-btn').click(function(){
    $('.supp-filiere').slideToggle();
    $('.modif-filiere').slideUp();
    $('.nouv-filiere').slideUp();
});
    // 'modifier' button
    //effacer les champs
    $('.modif-filiere .effacer-btn-fl').click(function(){
        $('.modif-filiere-form input:eq(0)').val('');
        $('.modif-filiere-form input:eq(1)').val('');
        $('.modif-filiere-form input:eq(2)').val('');
    });
    // load 'filiere' infos on click 
    $('.modif-filiere .charger-btn-fl').click(function(){
        var code_filiere = $('.modif-filiere-form input:eq(0)').val().trim();
        if( code_filiere == '')
        {
            console.log('code filiere vide');
            return;
        }
        else
        {
            $('.table-filieres tr').each(function(){
                var code__filiere_table = $(this).find('td:eq(0)').html();
                if(code_filiere.toUpperCase() === code__filiere_table){
                    $('.modif-filiere-form input:eq(1)').val(($(this).find('td:eq(1)').html()));
                    $('.modif-filiere-form input:eq(2)').val(($(this).find('td:eq(2)').html()));
                    return;
                }
            });
        }
});
// crud forms 'filiere' end

// crud forms 'modules' start
//slide forms animation
$('.ajouter-module-btn').click(function(){
    $('.nouv-module').slideToggle();
    $('.modif-module').slideUp();
    $('.supp-module').slideUp();
    $('.rech-module-filiere-annee').slideUp();
});
$('.modifier-module-btn').click(function(){
    $('.modif-module').slideToggle();
    $('.nouv-module').slideUp();
    $('.supp-module').slideUp();
    $('.rech-module-filiere-annee').slideUp();
});
$('.supprimer-module-btn').click(function(){
    $('.supp-module').slideToggle();
    $('.modif-module').slideUp();
    $('.nouv-module').slideUp();
    $('.rech-module-filiere-annee').slideUp();
});
$('.rechercher-module-filiere-annee-btn').click(function(){
    $('.rech-module-filiere-annee').slideToggle();
    $('.modif-module').slideUp();
    $('.nouv-module').slideUp();
    $('.supp-module').slideUp();
});

    // 'modifier' button
    //effacer les champs
    $('.modif-module .effacer-btn-mdl').click(function(){
        $('.modif-module-form input:eq(0)').val('');
        $('.modif-module-form input:eq(1)').val('');
        $('.modif-module-form select:eq(0)').val('');
        $('.modif-module-form select:eq(1)').val('');
    });
    // load 'module' infos on click 
    $('.modif-module .charger-btn-mdl').click(function(){
        var code_module = $('.modif-module-form input:eq(0)').val().trim();
        if( code_module == '')
            return;
        else
        {
            $('.table-modules tr').each(function(){
                var code_module_table = $(this).find('td:eq(0)').html();//code module
                if(code_module.toUpperCase() === code_module_table){
                    $('.modif-module-form input:eq(1)').val(($(this).find('td:eq(1)').html()));//nom module
                    $('.modif-module-form select:eq(0)').val(($(this).find('td:eq(2)').html()));//filiere
                    $('.modif-module-form select:eq(1)').val(($(this).find('td:eq(3)').html()));//annee
                    return;
                }
            });
        }
    });

    //search by 'annee' (select filiere)
    $('.select-annee-search').change(function(){
        var annee = $('.select-annee-search').val();
        //search for potentiel matches in 'annee' and 'filiere'
        $('.table-modules tr:gt(0)').filter(function(){
            $(this).toggle($(this).find('td:eq(2)').html() === annee);
        });
    });
    //cancel search button
    $('.rech-module-filiere-annee .cancel-btn button').click(function(){
        $('.table-modules tr').filter(function(){
            $(this).toggle($(this).text() !== '');
        });
        $('.select-filiere-search').val('');
        $('.select-annee-search').val('');
    });
// crud forms 'modules' end

// crud forms 'enseignnts' start
//slide forms animation
$('.ajouter-enseignant-btn').click(function(){
    $('.nouv-enseignant').slideToggle();
    $('.modif-enseignant').slideUp();
    $('.supp-enseignant').slideUp();
    $('.rech-enseignant-module').slideUp();
});
$('.modifier-enseignant-btn').click(function(){
    $('.modif-enseignant').slideToggle();
    $('.nouv-enseignant').slideUp();
    $('.supp-enseignant').slideUp();
    $('.rech-enseignant-module').slideUp();
});
$('.supprimer-enseignant-btn').click(function(){
    $('.supp-enseignant').slideToggle();
    $('.modif-enseignant').slideUp();
    $('.nouv-enseignant').slideUp();
    $('.rech-enseignant-module').slideUp();
});
$('.rechercher-enseignant-module-btn').click(function(){
    $('.rech-enseignant-module').slideToggle();
    $('.modif-enseignant').slideUp();
    $('.nouv-enseignant').slideUp();
    $('.supp-enseignant').slideUp();
});

    // 'modifier' button
    //effacer les champs
    $('.modif-enseignant .effacer-btn-ens').click(function(){
        $('.modif-enseignant-form input:eq(0)').val('');
        $('.modif-enseignant-form input:eq(1)').val('');
        $('.modif-enseignant-form input:eq(2)').val('');
        $('.modif-enseignant-form input:eq(3)').val('');        
        $('.modif-enseignant-form select:eq(0)').val('');        
    });
    // load 'module' infos on click 
    $('.modif-enseignant .charger-btn-ens').click(function(){
        var code_enseignant = $('.modif-enseignant-form input:eq(0)').val().trim();
        if( code_enseignant == '')
            return;
        else
        {
            $('.table-enseignants tr').each(function(){
                var code_enseignant_table = $(this).find('td:eq(0)').html();//code enseignant
                if(code_enseignant.toUpperCase() === code_enseignant_table){
                    $('.modif-enseignant-form input:eq(1)').val(($(this).find('td:eq(1)').html()));//nom enseignant
                    $('.modif-enseignant-form input:eq(2)').val(($(this).find('td:eq(2)').html()));//prenom enseignant
                    $('.modif-enseignant-form input:eq(3)').val(($(this).find('td:eq(3)').html()));//email enseignnt
                    $('.modif-enseignant-form select:eq(0)').val(($(this).find('td:eq(4)').html()));//module
                    return;
                }
            });
        }
    });
    //search by 'module' (select module)
    $('.select-enseignant-module-search').change(function(){
        var code_module = $('.select-enseignant-module-search').val();
        $('.table-enseignants tr:gt(0)').filter(function(){
            //search for potentiel matches in 'filiere'
            $(this).toggle($(this).find('td:eq(4)').html() === code_module);//show it if it passes the test function inside find()
        });
    });

    //cancel search button
    $('.rech-enseignant-module .cancel-btn button').click(function(){
        $('.select-enseignant-module-search').val('');
        $('.table-enseignants tr').filter(function(){
            $(this).toggle($(this).text() !== ''); //show row if has text inside(to cancel the search results)
        });
    });

// crud forms 'enseignants' end

// associations page start
//slide animation
$('.association-control-panel .associer-btn').click(function(){
    $('#panel1').slideToggle();
    $('#panel2').slideUp();
    $('.rech-assc-filiere').slideUp();
    $('.rech-assc-module').slideUp();
});
$('.association-control-panel .supprimer-btn').click(function(){
    $('#panel2').slideToggle();
    $('#panel1').slideUp();
    $('.rech-assc-filiere').slideUp();
    $('.rech-assc-module').slideUp();
});
$('.association-control-panel .rechercher-par-filiere-btn').click(function(){
    $('.rech-assc-filiere').slideToggle();
    $('#panel1').slideUp();
    $('#panel2').slideUp();
    $('.rech-assc-module').slideUp();
});
$('.association-control-panel .rechercher-par-module-btn').click(function(){
    $('.rech-assc-module').slideToggle();
    $('#panel1').slideUp();
    $('#panel2').slideUp();
    $('.rech-assc-filiere').slideUp();
});

    //search by 'filiere'
    $('.rech-assc-filiere .select-flr').change(function(){
        var code_filiere = $('.rech-assc-filiere .select-flr').val();
        $('.table-associations tr:gt(0)').filter(function(){
            //search for potentiel matches of 'filiere'
            $(this).toggle($(this).find('td:eq(2)').html() === code_filiere);//show it if it passes the test function inside find()
        });
    });    

    //search by 'module'
    $('.rech-assc-module .select-mdl').change(function(){
        var code_module = $('.rech-assc-module .select-mdl').val();
        $('.table-associations tr:gt(0)').filter(function(){
            //search for potentiel matches of 'module'
            $(this).toggle($(this).find('td:eq(0)').html() === code_module);//show it if it passes the test function inside find()
        });
    }); 

    //cancel search button of 'recherche par filiere'
    $('.rech-assc-filiere .cancel-btn button').click(function(){
        $('.rech-assc-filiere .select-flr').val('');
        $('.table-associations tr').filter(function(){
            $(this).toggle($(this).text() !== ''); //show row if has text inside(to cancel the search results)
        });
    });
    //cancel search button of 'recherche par module'
    $('.rech-assc-module .cancel-btn button').click(function(){
        $('.rech-assc-module .select-mdl').val('');
        $('.table-associations tr').filter(function(){
            $(this).toggle($(this).text() !== ''); //show row if has text inside(to cancel the search results)
        });
    });
// associations page end

// message page start (admin side)
    //date time picker search button
    $('.by-time .rech-date-btn').click(function(){
        var date_rech = $('.by-time .date-recep').val().split('-').reverse().join('-');
        if(date_rech === ''){
            alert('Veuillez entrer une date valide !');
            return;
        }
        var date_recep = document.querySelectorAll('.sent-date span');
        console.log(date_rech);
        for(var elm of date_recep){
            console.log(elm.innerHTML);
        }
        $('.message-content').filter(function(){
            $(this).toggle($(this).find('.sent-date span').html() === date_rech);
        });
    });
    //cancel search button
    $('.by-time .annuler-btn').click(function(){
        $('.message-content').filter(function(){
            $(this).toggle($(this).find('.sent-date span').html() !== '');
        });
        $('.by-time .date-recep').val('');
    });
// message page end (admin side)

// actualites page start(admin side)
//slide animation
$('.show-actualite .ajout-actu-btn').click(function(){
    $('.nouv-actualite').slideToggle();
    $('.modif-actualite').slideUp();
    $('.rech-actualite').slideUp();
});
$('.show-actualite .modif-actu-btn').click(function(){
    $('.modif-actualite').slideToggle();
    $('.nouv-actualite').slideUp();
    $('.rech-actualite').slideUp();
});
$('.show-actualite .rech-actu-btn').click(function(){
    $('.rech-actualite').slideToggle();
    $('.modif-actualite').slideUp();
    $('.nouv-actualite').slideUp();
});
        //load infos of 'actualites' on click
        $('.load-infos-actu').click(function(){
            var idAct = $('.idAct').val().trim();
            if(idAct == '')
                return;
            $('.table-actualites tr').each(function(){
                var id_table = $(this).find('td:eq(0)').html(); //idActualite in table
                if(id_table === idAct){
                    $('.objetAct').val($(this).find('td:eq(1)').html());
                    $('.contentAct').val($(this).find('td:eq(2)').html());
                    return;
                }
            });
        });
        //clear fields
        $('.vider-actu-champs').click(function(){
            $('.idAct').val('');
            $('.objetAct').val('');
            $('.contentAct').val('');
        });
        //search by date
        $('.rech-date-actu').click(function(){
            var date_pub = $('.date-publication').val().split('-').reverse().join('-'); //reverse format of date
            if(date_pub === ''){
                alert('Veuillez entrer un date valide !');
                return;
            }
            $('.table-actualites tr:gt(0)').filter(function(){
                $(this).toggle($(this).find('td:eq(3)').html() === date_pub); //show rows that match selected date
            });
        });
        //cancel search btn
        $('.annuler-rech-actu').click(function(){
            $('.date-publication').val('');
            $('.table-actualites tr:gt(0)').filter(function(){
                $(this).toggle($(this).find('td:eq(3)').html() !== ''); //show rows that match selected date
            });
        });
// actualites page end(admin side)

// actualite client side start
// slide animation
$('.actualite-elm .obj span .arrow-down').click(function(){
    $(this).parents('.actualite-elm').find('.content').slideToggle();
});
// actualite client side end

// etudiant-client (mes demandes page) start 
//slide-animation of 'demande'
$('.dmd .infos-dmd').click(function(){
    $(this).parents('.dmd').find('.status-demande').slideToggle();
});

// etudiant-client (mes demandes page) end 

// demandes (admin side) start
//slide animation of search fields(by date and status)
$('.rech-demande .rech-dmd-date').click(function(){
    $('.rech-demande-par-statut').slideUp();
    $('.rech-demande-par-date').slideToggle();
});
$('.rech-demande .rech-dmd-statut').click(function(){
    $('.rech-demande-par-date').slideUp();
    $('.rech-demande-par-statut').slideToggle();
});
    //search 'demande' by 'date reception'
    $('.rech-demande-par-date .btns .rechercher').click(function(){
        if($('.rech-demande-par-date > input').val() === ''){
            alert('Veuillez entrer une date valide !');
            return;
        }
        const date = $('.rech-demande-par-date > input').val().split('-').reverse().join('-');//reversed date
        $('.table-demandes tr:gt(0)').filter(function(){
            $(this).toggle($(this).find('td:eq(2)').html() === date);
        });
    });
    //cancel search 'date reception'
    $('.rech-demande-par-date .btns .annuler').click(function(){
        $('.rech-demande-par-date > input').val('');
        $('.table-demandes tr:gt(0)').filter(function(){
            $(this).toggle($(this).find('td:eq(2)').html() !== '');
        });
    });

    //search 'demande' by 'status'
    $('.rech-demande-par-statut .btns .rechercher').click(function(){
        const statut = $('.rech-demande-par-statut > select').val();
        $('.table-demandes tr:gt(0)').filter(function(){
            $(this).toggle($(this).find('td:eq(5) button').html() === statut);
        });
    });
    //cancel search 'status'
    $('.rech-demande-par-statut .btns .annuler').click(function(){
        $('.rech-demande-par-statut > select').val('');
        $('.table-demandes tr:gt(0)').filter(function(){
            $(this).toggle($(this).find('td:eq(5) button').html() !== '');
        });
    });
// demandes (admin side) end