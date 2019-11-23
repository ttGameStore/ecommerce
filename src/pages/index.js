import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import cart from "../images/icon-shopping-cart.png"
import trueMoney from "../images/icon-true-money.png"
import garenaCard from "../images/icon-garena-card.png"
import iconArrowDown from "../images/icon-arrow-down.png"
import Carousel from "react-multi-carousel";
import { apiGatewayInstance } from "../connect/createApi";
import axios from "axios";
import { fetch } from 'whatwg-fetch'
import Drawer from 'react-drag-drawer'
import Slider from "react-slick"

const IndexPage = () => {
  const [statusMoneyCard, setStatusMoneyCard] = useState(false);
  const [menuCardList, setMenuCardList] = useState('');
  const [cardCategory, setCardCategory] = useState('');
  const [titleNameCard, setTitleNameCard] = useState('');
  useEffect(() => {
    apiGatewayInstance.get('/api/getMenuCard')
      .then((response) => {
        console.log('response', response.data)
        setMenuCardList(response.data)
      })
  }, [])
  const sectionFunction = () => {
    const headerHeight = 50; /* PUT HEADER HEIGHT HERE */
    const buffer = 25; /* MAY NOT BE NEEDED */
    const scrollToEl = document.querySelector("#trueMoney");
    const topOfElement = window.pageYOffset + scrollToEl.getBoundingClientRect().top - headerHeight - buffer;
    window.scroll({ top: topOfElement, behavior: "smooth" });
    // document.getElementById("iconArrowDown").style.display = "none";
  }
  const handleSelectMoneyCard = (value, id, titleName) => {
    setStatusMoneyCard(value);
    setTitleNameCard(titleName);
    apiGatewayInstance.get(`/api/getCardFromCategory?cardCategoryId=${id}`)
      .then((response) => {
        console.log('response menu card', response.data.data)
        setCardCategory(response.data.data)
        // setStatusMoneyCard(value);
      })
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Layout>
      {/* desktop */}
      <div className="d-none d-lg-flex">
        <div className="w-100">
          <div className="shopping-card-style">
            <img src={cart} width="18" height="18" />
          </div>
          <div id="home" className="col section-first">
            <div className="row justify-content-center align-items-center h-100">
              <div>
                <div className="title-page">Welcome to</div>
                <div className="subTitle-page">TT Game Store</div>
              </div>
            </div>
          </div>
          <div id="trueMoney" className="section-second">
            <div className="row justify-content-center">
              <div className="title-section-second">Cash card</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="money-card-style">
                <div className="row">
                  {
                    menuCardList ? (
                      menuCardList.map((list, index) => (
                        <div className="col-3" key={index}>
                          <div className="section-second-box">
                            <div>
                              <div className="text-center">{list.name_card_category}</div>
                              <img src={`https://ttgammestore.com/image/cardCategory/${list.image_card_category}`} width="100%" height="150" style={{ objectFit: 'contain' }} />
                              <div className="style-center">
                                <button className="button-buy" onClick={() => handleSelectMoneyCard(true, list.id, list.name_card_category)}>Select</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )
                      : null
                  }
                </div>
              </div>
            </div>
            <Drawer
              open={statusMoneyCard}
              onRequestClose={() => handleSelectMoneyCard(false)}
            >
              <div className="modal-money-card-style">
                <div>
                  <div className="col">
                    <div className="row justify-content-between">
                      <div className="text-center">{titleNameCard}</div>
                      <span className="pointer" onClick={() => handleSelectMoneyCard(false)}>&times;</span>
                    </div>
                  </div>
                  <div className="row">
                    {
                      cardCategory ? (
                        cardCategory.map((list, index) => (
                          <div className="col-3" key={index}>
                            <div className="row justify-content-center">
                              <div className="money-card-category-box">
                                <div>{list.name_card}</div>
                              </div>
                            </div>
                          </div>
                        ))
                      )
                        : null
                    }
                  </div>
                </div>
                <div className="col mt-3">
                  <div className="row justify-content-end">
                    <div className="button-add-buy">
                      <span>Buy</span>
                    </div>
                    <div className="button-add-card ml-2">
                      <span>+ Add Card</span>
                    </div>
                  </div>
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="d-flex d-lg-none">
        <div className="w-100">
          <div className="shopping-card-style">
            <img src={cart} width="18" height="18" />
          </div>
          <div id="home" className="col section-first">
            <div className="row justify-content-center align-items-center h-100">
              <div>
                <div className="title-page">Welcome to</div>
                <div className="subTitle-page">TT Game Store</div>
              </div>
            </div>
          </div>
          <div id="trueMoney" className="section-second">
            <div className="col">
              <div className="row justify-content-center">
                <div className="title-section-second">Cash card</div>
              </div>
            </div>
            <Slider {...settings} style={{ backgroundColor: 'green' }}>
              {
                menuCardList ? (
                  menuCardList.map((list, index) => (
                    <div key={index}>
                      <div className="section-second-box">
                        <div>
                          <div className="text-center">{list.name_card_category}</div>
                          <img src={trueMoney} width="100%" height="150" style={{ objectFit: 'contain' }} />
                          <div className="style-center">
                            <button className="button-buy" onClick={() => handleSelectMoneyCard(true, list.id, list.name_card_category)}>Select</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )
                  : null
              }
            </Slider>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
