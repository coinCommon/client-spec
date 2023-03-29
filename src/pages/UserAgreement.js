import React, {useEffect} from 'react';
import classes from "../css/index.module.scss";
import Footer from "../components/HeaderAndFooter/Footer";

const UserAgreement = () => {
    useEffect(() => {
        document.title = 'Спецпромгрупп / Пользовательское соглашение об использовании сайта'
    }, [])
    return (
        <div>
            <section className={classes.user_agreement}>
                <div className={classes.container}>
                    <h2>Пользовательское соглашение об использовании сайта</h2>


                    <div className={classes.user_agreement_chapter}>1. Общие положения и термины.</div>
                    <div className={classes.user_agreement_title}> 1.1. Правообладатель – Индивидуальный предприниматель Завалова Н. Л.  (ОГРНИП: 318132600006835, ИНН: 130302077410).</div>
                    <div className={classes.user_agreement_title}>1.2. Интернет-магазин – электронный сервис, посредством функционала которого Покупатель (Пользователь) имеет возможность осуществить Заказ Товара в соответствии с условиями Оферты. Доступ к Интернет-магазину может быть осуществлен Покупателем (Пользователем) с помощью Интернет-сайта, Мобильного приложения в соответствии с действующими Пользовательскими соглашениями.</div>
                    <div className={classes.user_agreement_title}>1.3. Оферта – публичное предложение Продавца (Правообладателя) любому Покупателю (Пользователю) заключить на ее условиях договор розничной купли продажи Товара. Оферта является публичной в силу пункта 2 статьи 437 Гражданского кодекса Российской Федерации. Оферта доступна неограниченному кругу лиц посредством ее размещения Продавцом (Правообладателя) в Интернет-магазине (на Интернет-сайте и в Мобильном приложении).</div>
                    <div className={classes.user_agreement_title}>1.4. Интернет-сайт – сайт, размещенный в сети Интернет по адресу: https://www.specprom-rf.ru/, посредством которого Пользователь имеет возможность получить доступ к функционалу Интернет-магазина. Правообладатель Интернет-сайта является также Владельцем Интернет сайта. Исключительные права на отдельные материалы (контент), размещаемые на Интернет-сайте, могут принадлежать третьим лицам, предоставившим Правообладателю право на их использование. Правообладатель имеет все необходимые права на использование доменного имени specprom-rf.ru.</div>

                    <div className={classes.user_agreement_title}>1.7. Пользователь – обладающее необходимой правоспособностью дееспособное физическое лицо, получившее доступ к функционалу, сервисам и (или) материалам Интернет-сайта (вне зависимости от объема и способа доступа).</div>
                    <div className={classes.user_agreement_title}>1.8. Соглашение – настоящее Пользовательское соглашение об использовании Интернет-сайта, предметом которого является предоставление Правообладателем Пользователю услуг по доступу к использованию Интернет-сайта, его функционала, сервисов и материалов. Соглашение доступно неограниченному кругу лиц посредством ее размещения Правообладателем на Интернет-сайте. Соглашение вступает в силу с момента его размещения на Интернет сайте. Правообладатель вправе в любой момент в одностороннем порядке изменить Соглашение без уведомления Пользователя. В силу статьи 437 Гражданского кодекса Российской Федерации Соглашение признается публичной офертой. Получение Пользователем доступа к Интернет-сайту (его функционалу, сервисам, материалам) в любом объеме и любыми способами означает полное и безусловное принятие условий Соглашения.</div>

                    <div className={classes.user_agreement_chapter}>2. Регистрация на Интернет-сайте.</div>

                    <div className={classes.user_agreement_title}>2.1. Для получения расширенного доступа к Интернет-сайту, Мобильному приложению, Терминалу, их функционалу, сервисам и материалам Пользователю необходимо осуществить регистрацию на Интернет-сайте, в Мобильном приложении либо посредством Терминала.</div>
                    <div className={classes.user_agreement_title}>2.2. Регистрация на Интернет-сайте, в Мобильном приложении, посредством Терминала является безвозмездной и добровольной.</div>
                    <div className={classes.user_agreement_title}>2.3. Регистрация на Интернет-сайте осуществляется в момент нажатия кнопки «Зарегистрироваться» рядом с утверждением «Нажимая кнопку «Зарегистрироваться», я даю свое согласие на сбор и обработку моих персональных данных в соответствии с Политикой и принимаю условия Пользовательского соглашения».</div>
                    <div className={classes.user_agreement_title}>2.4. При регистрации на Интернет-сайте, в Мобильном приложении, посредством Терминала Пользователь обязан сообщить актуальную и достоверную информацию. В случае изменения информации, сообщенной при регистрации Пользователь обязан ее скорректировать.</div>
                    <div className={classes.user_agreement_title}>2.5. Правообладатель, не имея на это объективной возможности и правовых оснований, не обязан осуществлять проверку достоверности информации, предоставляемой Пользователем при регистрации на Интернет-сайте, в Мобильном приложении и посредством Терминала. Правообладатель исходит из того, что Пользователь предоставляет актуальную и достоверную информацию.</div>
                    <div className={classes.user_agreement_title}>2.6. При регистрации на Интернет-сайте, в Мобильном приложении, посредством Терминала формируется индивидуальный логин и пароль Пользователя. Логин и пароль используется Пользователем для получения расширенного доступа к Интернет-сайту, Мобильному приложению, и (или) Терминалу, а также их функционалу, сервисам и материалам.</div>
                    <div className={classes.user_agreement_title}>2.7. Пользователь обязуется иметь один логин и пароль при использовании (получении расширенного доступа) Интернет-сайта, Мобильного приложения и Терминала.</div>
                    <div className={classes.user_agreement_title}>2.8. Пользователь несет ответственность за сохранение логина и пароля в тайне от третьих лиц. Пользователь не вправе предоставлять свои логин и пароль третьим лицам.</div>
                    <div className={classes.user_agreement_title}>2.9. Любые действия, совершенные на Интернет-сайте, в Мобильном приложении и посредством Терминала с использованием логина и пароля, признаются действиями Пользователя, если иное не будет доказано Пользователем.</div>
                    <div className={classes.user_agreement_title}>2.10. Пользователь обязан незамедлительно сообщить Правообладателю о ставших ему известных случаях использования третьими лицами его логина и пароля.</div>
                    <div className={classes.user_agreement_title}>2.11. Отсутствие регистрации на Интернет-сайте, в Мобильном приложении, посредством Терминала не может трактоваться как отсутствие у Пользователя обязанности соблюдать требования Соглашения.</div>
                    <div className={classes.user_agreement_title}>2.12. Регистрируясь на Интернет-сайте, в Мобильном приложении, посредством Терминала, Пользователь дает свое явно выраженное, конкретное, предметное, информированное, сознательное, однозначное и свободное согласие на его информирование о товарах, услугах, специальных акциях, включая рекламные, предложениях Правообладателя и третьих лиц, по усмотрению Правообладателя, в том числе посредством рекламных и (или) информационных рассылок и уведомлений, направляемых по электронной почте, с помощью телефонной связи (включая телефонные звонки и направление текстовых сообщений), а также посредством использования мессенджеров (программ обмена сообщениями с помощью Интернета) по адресам электронных почт и телефонных номерам, указанным Пользователям при регистрации и (или) иным образом сообщенным Пользователем Правообладателю, а также push-уведомлений на мобильном телефоне, смартфоне и (или) ином электронном устройстве, на которое установлено (загружено и (или) скачено) Мобильное приложение.</div>
                    <div className={classes.user_agreement_title}>2.13. Пользователь, используя функционал Интернет-сайта, Мобильного приложения, Терминала вправе в любой момент безвозмездно отключить услугу рекламных рассылок и уведомлений.</div>

                    <div className={classes.user_agreement_chapter}>3. Персональные данные и иные сведения Пользователя.</div>

                    <div className={classes.user_agreement_title}>3.1. Персональные данные – это любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу (субъекту персональных данных).</div>
                    <div className={classes.user_agreement_title}>3.2. Оператором, обрабатывающим персональные данные, является Индивидуальный предприниматель Завалова Н. Л. (ОГРНИП: 318132600006835, ИНН: 130302077410).</div>
                    <div className={classes.user_agreement_title}>3.3. Сбор и обработка персональных данных на Интернет-сайте осуществляется в соответствии с действующим законодательством и Политикой обработки персональных данных, доступной для ознакомления на Интернет-сайте по адресу: https://www.specprom-rf.ru/about/privacy-policy.</div>
                    <div className={classes.user_agreement_title}>3.4. При использовании Интернет-сайта Правообладателю автоматические могут передаваться Пользователем куки-файлы (файлы Cookie).</div>
                    <div className={classes.user_agreement_title}>3.5. Куки-файлы представляют собой фрагменты данных, сохраняемых в браузере компьютера, мобильного телефона или иного смартфона, посредствам которого осуществляется посещение сайтов в сети интернет.</div>
                    <div className={classes.user_agreement_title}>3.6. Посредствам куки-файлов Правообладателю может быть передана следующая информация, исходящая от Пользователя: IP-адрес, MAC адрес, внешний источник перехода на Интернет-сайт (включая обратные ссылки), идентификатор php-сессии, идентификационный номер приглашения на Интернет-сайт в рамках реферальных программ, об используемом Пользователем программном обеспечении и оборудовании для работы в сети Интернет, о каналах связи, о передаваемой и получаемой с использованием Интернет-сайта информации и материалов, о поведение Пользователя на Интернет сайте, а также иная информация подобного характера.</div>
                    <div className={classes.user_agreement_title}>3.7. Пользователь имеет возможность самостоятельно удалить куки-файлы, а также запретить их передачу, воспользовавшись функционалом используемого им браузера.</div>
                    <div className={classes.user_agreement_title}>3.8. Используя Интернет-сайт Пользователь выражает свое согласие на передачу куки-файлов постольку, поскольку им в отношении Интернет-сайта не реализована возможность, указанная в пункте 3.7 Политики.</div>

                    <div className={classes.user_agreement_chapter}>4. Интеллектуальная собственность.</div>

                    <div className={classes.user_agreement_title}>4.1. Соглашение не признается лицензионным договором, его положения не могут быть расценены как предоставляющее Пользователю право использования каких бы то ни было объектов интеллектуальной собственности и (или) их отдельных частей (элементов).</div>
                    <div className={classes.user_agreement_title}>4.2. Использование материалов (контента) Интернет-сайта допускается исключительно с согласия Правообладателя, а в отдельных случаях по указанию Правообладателя требуется также дополнительное согласие третьих лиц.</div>
                    <div className={classes.user_agreement_title}>4.3. При правомерном цитировании материалов (контента) Интернет-сайта в силу подпункта 1 пункта 1 статьи 1274 Гражданского кодекса Российской Федерации ссылка на Интернет-сайт и Правообладателя является обязательной.</div>

                    <div className={classes.user_agreement_chapter}>5. Права и обязанности Пользователя.</div>

                    <div className={classes.user_agreement_title}>5.1. Пользователь вправе использовать доступный функционал, сервисы и (или) материалы Интернет-сайта в строгом соответствии с Соглашением и действующим законодательством Российской Федерации.</div>
                    <div className={classes.user_agreement_title}>5.2. Пользователю запрещается любыми способами получать доступ и использовать логины и пароли иных Пользователей.</div>
                    <div className={classes.user_agreement_title}>5.3. Пользователь обязан воздерживаться от любых действий, как прямо, так и косвенно влияющих на нормальное функционирование Интернет сайта и его работоспособность.</div>
                    <div className={classes.user_agreement_title}>5.4. Пользователь, оставляя на Интернет-сайте комментарии и любые записи, обязан соблюдать требования действующего законодательства Российской Федерации и не допускать нарушения норм морали и нравственности.</div>
                    <div className={classes.user_agreement_title}>5.5. Использование Интернет-сайта Пользователем должно осуществляться в строгом соответствии положениям действующего законодательства Российской Федерации.</div>

                    <div className={classes.user_agreement_chapter}>6. Заключительные положения.</div>

                    <div className={classes.user_agreement_title}>6.1. Пользователь предупрежден и согласен с тем, что Интернет-сайт, его сервисы, материалы (контент) и любые их части (элементы) могут сопровождаться рекламой без специального (дополнительного) уведомления об этом.</div>
                    <div className={classes.user_agreement_title}>6.2. Пользователь предупрежден и согласен с тем, что Правообладатель не несет ответственности за содержание, использование и посещение Пользователем интернет-сайтов (интернет-страниц) третьих лиц, ссылки на которые могут быть размещены на Интернет-сайте.</div>
                    <div className={classes.user_agreement_title}>6.3. Правообладатель ни при каких обстоятельствах и условиях не несет перед Пользователем и (или) третьими лицами ответственность за любые убытки, включая упущенную выгоду, прямо или косвенно связанные с использованием (посещением) Интернет-сайта.</div>
                    <div className={classes.user_agreement_title}>6.4. Все споры, вытекающие из Соглашения или связанные с ним, подлежат рассмотрению в соответствии с действующим законодательством с соблюдением обязательно претензионного (досудебного) порядка, если иное не предусмотрено действующим законодательством.</div>
                    <div className={classes.user_agreement_title}>6.5. В случае признания судом отдельных положений Соглашения недействующими остальные положения Соглашения продолжают свое действие в полном объеме.</div>
                    <div className={classes.user_agreement_title}>6.6. Правообладатель оставляет за собой право в одностороннем порядке вносить изменения и дополнения в Соглашение в любой момент. Соглашение в новой версии действует (вступает в силу) с момента его размещения на Интернет-сайте. Использование Пользователем Интернет-сайта после внесения любых изменений в действующее Соглашение означает принятие этих изменений.</div>
                    <div className={classes.user_agreement_title}>6.7. Правообладатель вправе в любой момент без предварительного уведомления приостановить (как юридически, так и технически) предоставление услуг по предоставлению доступа к использованию Интернет-сайта, его функционала, сервисов и материалов.</div>




                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default UserAgreement;