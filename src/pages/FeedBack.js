import React from 'react';
import classes from "../css/index.module.scss";
import Footer from "../components/HeaderAndFooter/Footer";

const FeedBack = () => {
    return (
        <div>
            <section className={classes.feedback}>
                <div className={classes.container}>
                    <h2>Обратная связь</h2>


                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default FeedBack;