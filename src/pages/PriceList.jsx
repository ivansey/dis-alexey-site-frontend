import React, {Component} from "react";
import {Alert, Container, Grid, Table, TableBody, TableRow, TableCell, TableContainer, Paper} from "@mui/material";
import store from "../store";
import NewOrderButtons from "../components/NewOrderButtons.jsx";

class PriceList extends Component {
    render() {
        return <div>
            <Container sx={{textAlign: "center"}}>
                <br/>
                <br/>
                <h2>Цены и услуги</h2>
                <h4>Квартиры</h4>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} lg={6}>
                        <Paper>
                            <h5>Холодный туман</h5>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>1-ком квартира</TableCell>
                                            <TableCell align="right">3000 ₽</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>2-ком квартира</TableCell>
                                            <TableCell align="right">3300 ₽</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>3-ком квартира</TableCell>
                                            <TableCell align="right">3500 ₽</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>4-ком квартира</TableCell>
                                            <TableCell align="right">3800 ₽</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>5-ком квартира</TableCell>
                                            <TableCell align="right">4100 ₽</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <br/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Paper>
                            <h5>Горячий туман</h5>
                            <TableContainer>
                                <Table>
                                    <TableRow>
                                        <TableCell>1-ком квартира</TableCell>
                                        <TableCell align="right">4500 ₽</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>2-ком квартира</TableCell>
                                        <TableCell align="right">5000 ₽</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>3-ком квартира</TableCell>
                                        <TableCell align="right">5500 ₽</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>4-ком квартира</TableCell>
                                        <TableCell align="right">6000 ₽</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>5-ком квартира</TableCell>
                                        <TableCell align="right">6500 ₽</TableCell>
                                    </TableRow>
                                </Table>
                            </TableContainer>
                            <br/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Paper>
                            <h5>Комплексная обработка</h5>
                            <TableContainer>
                                <Table>
                                    <TableRow>
                                        <TableCell>1-ком квартира</TableCell>
                                        <TableCell align="right">6500 ₽</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>2-ком квартира</TableCell>
                                        <TableCell align="right">7000 ₽</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>3-ком квартира</TableCell>
                                        <TableCell align="right">7500 ₽</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>4-ком квартира</TableCell>
                                        <TableCell align="right">8000 ₽</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>5-ком квартира</TableCell>
                                        <TableCell align="right">8500 ₽</TableCell>
                                    </TableRow>
                                </Table>
                            </TableContainer>
                            <br/>
                        </Paper>
                    </Grid>
                </Grid>
                <br/>
                <NewOrderButtons variant="contained"/>
                <br/>

                <h5>Вторая обработка - скидка 50%</h5>
                <h5>Третья обработка - бесплатно</h5>
                <h5>Скидка 10% при обработка двух квартир и более</h5>
                <br/>
                <h4>Участки</h4>
                <h5>Обрабка от клещей, муравьев, ос, комаров, мух, земляных блох и т.д.</h5>
                <br/>
                <TableContainer component={Paper}>
                    <Table>
                        <TableRow>
                            <TableCell>До 10 соток</TableCell>
                            <TableCell align="right">600 ₽/сотка</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>До 15 соток</TableCell>
                            <TableCell align="right">550 ₽/сотка</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>До 20 соток</TableCell>
                            <TableCell align="right">500 ₽/сотка</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Более 20 соток</TableCell>
                            <TableCell align="right">450 ₽/сотка</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Обработка деревьев</TableCell>
                            <TableCell align="right">250 ₽/дерево</TableCell>
                        </TableRow>
                    </Table>
                    <br/>
                    <Alert severity="info">Большие площади обговариваются отдельно</Alert>
                </TableContainer>
                <br/>
                <NewOrderButtons variant="contained"/>
                <br/>
                <h5>Обработка производственных помещений, общежитий, хостелов и т.д. по договорённости</h5>
            </Container>
        </div>;
    }
}

export default PriceList;