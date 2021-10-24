import React from "react";
import {Container} from "@mui/material";

function MainText (props) {
    return <Container>
        <p>
            <span>Я провожу <b>дезинсекцию квартир и участков (в Подольске, в Климовске, в Чехове, в Троицке, в Серпухове, в Видном)</b> только с применением лучшего оборудования и препаратов. <b>Дезинсекция</b> поможет <b>избавиться от насекомых</b>, вне зависимости от помещения или участка и их размеров.</span>
            <span>В зависимости от проблемы, подбирается тактика её решения. При соблюдении клиентом простых рекомендаций, я <b>гарантирую избавление</b> от таких паразитов, как:</span>
        </p>
        <ul type="disk">
            <li>- тараканы,</li>
            <li>- клопы,</li>
            <li>- муравьи,</li>
            <li>- клещи.</li>
        </ul>
        <p>При необходимости, я подготавливаю помещение к обработке, дата, время и рекомендации согласовываются с клиентом заранее, чтобы работа не принесла дискомфорта и неожиданностей.
        Благодаря эффективным препаратам, можно не беспокоиться о здоровье после определённого времени, препарат практически безвреден для организма человека (РЕКОМЕНДАЦИИ СПЕЦИАЛИСТА СОБЛЮДАТЬ ОБЯЗАТЕЛЬНО). </p>
    </Container>
}

export default MainText;