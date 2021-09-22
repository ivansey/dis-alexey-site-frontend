import React, {Component} from "react";
import {Link} from "react-router-dom";
import store from "../store";

class PriceList extends Component {
    render() {
		return <div>
            <div className="container center-align">
                <br />
                <h2>Цены и услуги</h2>
                <h4>Квартиры</h4>
                <div className="row">
                    <div className="col s12 m12 l6">
                        <h5>Холодный туман</h5>
                        <table>
                            <tbody>
                            <tr>
                                <td>1-ком квартира</td>
                                <td>3000 ₽</td>
                            </tr>
                            <tr>
                                <td>2-ком квартира</td>
                                <td>3300 ₽</td>
                            </tr>
                            <tr>
                                <td>3-ком квартира</td>
                                <td>3500 ₽</td>
                            </tr>
                            <tr>
                                <td>4-ком квартира</td>
                                <td>3800 ₽</td>
                            </tr>
                            <tr>
                                <td>5-ком квартира</td>
                                <td>4100 ₽</td>
                            </tr>
                            </tbody>
                        </table>
                        <br />
                        <a className="btn red" href={`tel:${store.getState().telLink}`}>Позвонить</a>
                    </div>
                    <div className="col s12 m12 l6">
                        <h5>Горячий туман</h5>
                        <table>
                            <tr>
                                <td>1-ком квартира</td>
                                <td>4500 ₽</td>
                            </tr>
                            <tr>
                                <td>2-ком квартира</td>
                                <td>5000 ₽</td>
                            </tr>
                            <tr>
                                <td>3-ком квартира</td>
                                <td>5500 ₽</td>
                            </tr>
                            <tr>
                                <td>4-ком квартира</td>
                                <td>6000 ₽</td>
                            </tr>
                            <tr>
                                <td>5-ком квартира</td>
                                <td>6500 ₽</td>
                            </tr>
                        </table>
                        <br />
                        <a className="btn red" href={`tel:${store.getState().telLink}`}>Позвонить</a>
                    </div>
                </div>

                <h5>Вторая обработка - скидка 50%</h5>
                <h5>Третья обработка - бесплатно</h5>
                <h5>Скидка 10% при обработка двух квартир и более</h5>
                <br />
                <h4>Участки</h4>
                <h5>Обрабка от клещей, муравьев, ос, комаров, мух, земляных блох и т.д.</h5>
                <br />
                <div className="col s12 m12 l6">
                    <table>
                        <tr>
                            <td>До 10 соток</td>
                            <td>600 ₽/сотка</td>
                        </tr>
                        <tr>
                            <td>До 15 соток</td>
                            <td>550 ₽/сотка</td>
                        </tr>
                        <tr>
                            <td>До 20 соток</td>
                            <td>500 ₽/сотка</td>
                        </tr>
                        <tr>
                            <td>Более 20 соток</td>
                            <td>450 ₽/сотка</td>
                        </tr>
                        <tr>
                            <td>Большие площади обговариваются индивидуально</td>
                        </tr>
                        <tr>
                            <td>Обработка деревьев</td>
                            <td>250 ₽/дерево</td>
                        </tr>
                    </table>
                    <br />
                    <a className="btn red" href={`tel:${store.getState().telLink}`}>Позвонить</a>
                </div>
                <br />
                <h5>Обработка производственных помещений, общежитий, хостелов и т.д. по договорённости</h5>
            </div>
        </div>;
	}
}

export default PriceList;