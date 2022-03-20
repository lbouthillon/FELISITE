import React, {Component} from 'react';
import {
    Segment,
} from 'semantic-ui-react';
import killer_lore from '../img/background.png'

export default class Rules extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <div className="bodyDesktop">
                <Segment style={{marginTop: '20px', backgroundColor: '#111111'}}>
                    <h2 style = {{color: 'white'}}>Histoire</h2>
                    <p><img src={killer_lore} alt={"killer_lore"} width={"100%"}/></p>
                    <p style={{textIndent: "30px"}} style = {{color: 'white'}}>{`Le tonnerre gronde sur Victoria. Sous les bruits incessants de la ville et des machines, de
                        terribles complots se préparent. Personne n’ose le dire, mais il ne fait aucun doute : ce n’est
                        qu’une question de jours avant que la Cité Mécanique sombre dans le chaos de la guerre.`}</p>
                    <p style = {{color: 'white'}}>{`Dans cette société viciée, chacun est ennemi de tous les autres ; mais lorsque les intérêts se
                        rejoignent, de puissants groupes se forment. Sont ainsi apparues trois grandes factions,
                        influentes et dangereuses :`}</p>
                    <p style = {{color: 'white'}}>
                        <text style={{fontWeight: "bold"}} style = {{color: 'white'}}>- Les Ouvriers</text>
                        {` de la Grande Horlogerie, qui composent la majorité prolétaire de la ville, en ont
                        assez d’être écrasés sous la botte de la noblesse et des entreprises. Rangés derrière
                        l’ingénieur révolutionnaire `}
                        <text style={{fontWeight: "bold"}} style = {{color: 'white'}}>Oswald Hudson</text>
                        {` ils comptent bien renverser le pouvoir en place, par
                        la force s'il le faut : que représentent quelques sacrifices, face à l'intérêt du plus grand
                        nombre ?`}</p>
                    <p style = {{color: 'white'}}>
                        <text style={{fontWeight: "bold"}} style = {{color: 'white'}}>- Les Nobles</text>
                        {` dirigent Victoria d’une main de fer, ce depuis des générations. Il ne fait nul doute
                    qu’eux seuls sont capables de donner une cohésion à cette ville corrompue : prolétaires et étrangers
                    guideraient cette cité dans l’abîme. Seul le Noble Jeu peut désigner un vainqueur, et en première
                    place se trouve `}
                        <text style={{fontWeight: "bold"}} style = {{color: 'white'}}>Henri Crolles</text>
                        {`, qui a su unifier les familles face à la menace`}</p>
                    <p style = {{color: 'white'}}>
                        <text style={{fontWeight: "bold"}} style = {{color: 'white'}}>- Les Amets</text>
                        {`, lointains voyageurs, tout juste arrivent à Victoria à bord de leurs dirigeables,
                    profitant de la crise pour s’emparer d’une place. D’où viennent-ils, et pourquoi sont-ils là ? Nul
                    ne le sait encore, mais une chose ne fait aucun doute : lorsque les riches et les pauvres se seront
                    massacrés, l’ambassadeur `}
                        <text style={{fontWeight: "bold"}} style = {{color: 'white'}}>Akilon Sofos</text>
                        {` n’aura qu’à tendre la main pour s'emparer de la ville.`}</p>
                    <br/>
                    <p style={{textIndent: "30px"}} style = {{color: 'white'}}>Ces trois groupes useront des stratégies les plus fourbes, des
                        manœuvres les plus viles pour
                        s’emparer de la Cité Mécanique. Enfin, comme pour attiser des braises déjà ardentes, un élément
                        inattendu est apparu :</p>
                    <p style={{fontWeight: 'bold'}} style = {{color: 'white'}}>Le Shuffle.</p>
                    <p style = {{color: 'white'}}>Il s’agit d’une nouvelle source d’énergie nébuleuse, dite miraculeuse, tout juste découverte par
                        Oswald et son associée, Erika Mason. Cette substance aurait des capacités extraordinaires, et
                        tout le monde le sait : celui qui le maîtrisera gagnera la guerre.</p>
                    <br/>
                    <p style={{textIndent: "30px"}} style = {{color: 'white'}}> Cocasse, ne trouvez-vous pas ? Un tel objet de convoitise,
                        tombé du ciel, comme s’il existait,
                        quelque part, un Dieu se délectant du chaos. Les factions s’étriperont, pour son contrôle ;
                        mais
                        les fragiles chaînes liant ses membres sauront-elles résister à un tel trésor ?</p>

                    <p style = {{color: 'white'}}> Mesdames, messieurs, prenez place, et contemplez les tréfonds de la nature humaine : c’est
                        l’heure de la guerre.
                        C’est l’heure du Killer.</p>
                    <br/>
                    <p style={{fontWeight: "bold"}} style = {{color: 'white'}}>- Mark Atwood-Monroe Jr.</p>
                </Segment>
                <div className="spacer"/>
            </div>
        );
    }
}

