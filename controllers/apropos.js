




const display_apropos = async (req, res) => {
    try {
        res.render('apropos', {title: 'A propos'});
    } catch (error) {
        console.log(error);
        res.write('<p>erreur, veuillez reessayer !</p><a href="/apropos">en cliquant ici</a>');
    }
};

module.exports = {
    display_apropos
};