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
  const handleSelectMoneyCard = (value, id) => {
    setStatusMoneyCard(value);
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
                {/* <div className="style-center">
                <a className="pointer" id="iconArrowDown" onClick={sectionFunction}>
                  <img className="iconArrowDown" src={iconArrowDown} height="30" width="30" />
                </a>
              </div> */}
              </div>
            </div>
          </div>
          <div id="trueMoney" className="section-second">
            <div className="row justify-content-center">
              <div className="title-section-second">True Money</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="money-card-style">
                <div className="row">
                  {
                    menuCardList ? (
                      menuCardList.map((list, index) => (
                        <div className="col-3" key={index}>
                          <div className="section-second-box" onClick={() => handleSelectMoneyCard(true, list.id)}>
                            <div>
                              <div className="text-center">{list.name_card_category}</div>
                              <img src={trueMoney} width="100%" height="150" style={{ objectFit: 'contain' }} />
                              {/* <div className="style-center">
                            <button className="button-buy">Buy</button>
                        </div> */}
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
                      <div className="text-center">True Money</div>
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
            <div className="row justify-content-center">
              <div className="title-section-second">True Money</div>
            </div>
            <div style={{ backgroundColor: 'red',  }}>
            <Slider {...settings}>
              {
                menuCardList ? (
                  menuCardList.map((list, index) => (
                    <div key={index}>
                      <div className="section-second-box" onClick={() => handleSelectMoneyCard(true, list.id)}>
                        <div>
                          <div className="text-center">{list.name_card_category}</div>
                          <img src={trueMoney} width="100%" height="150" style={{ objectFit: 'contain' }} />
                          {/* <div className="style-center">
                            <button className="button-buy">Buy</button>
                        </div> */}
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
      </div>
      {/* <div id="gameCard" className="section-third">
        <div className="row justify-content-center">
          <div className="title-section-third">Game Card</div>
        </div>
        <div className="row justify-content-center">
          <div className="section-third-box">
            <div>
              <div className="text-center">Garena 20</div>
              <img src={garenaCard} width="100%" height="150" style={{ objectFit: 'contain' }} />
              <div className="style-center">
                <button className="button-buy">Buy</button>
              </div>
            </div>
          </div>
          <div className="section-third-box">
            <div>
              <div className="text-center">Garena 50</div>
              <img src={garenaCard} width="100%" height="150" style={{ objectFit: 'contain' }} />
              <div className="style-center">
                <button className="button-buy">Buy</button>
              </div>
            </div>
          </div>
          <div className="section-third-box">
            <div>
              <div className="text-center">Garena 90</div>
              <img src={garenaCard} width="100%" height="150" style={{ objectFit: 'contain' }} />
              <div className="style-center">
                <button className="button-buy">Buy</button>
              </div>
            </div>
          </div>
          <div className="section-third-box">
            <div>
              <div className="text-center">Garena 100</div>
              <img src={garenaCard} width="100%" height="150" style={{ objectFit: 'contain' }} />
              <div className="style-center">
                <button className="button-buy">Buy</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="section-third-box">
            <div>
              <div className="text-center">Garena 150</div>
              <img src={garenaCard} width="100%" height="150" style={{ objectFit: 'contain' }} />
              <div className="style-center">
                <button className="button-buy">Buy</button>
              </div>
            </div>
          </div>
          <div className="section-third-box">
            <div>
              <div className="text-center">Garena 300</div>
              <img src={garenaCard} width="100%" height="150" style={{ objectFit: 'contain' }} />
              <div className="style-center">
                <button className="button-buy">Buy</button>
              </div>
            </div>
          </div>
          <div className="section-third-box">
            <div>
              <div className="text-center">Garena 500</div>
              <img src={garenaCard} width="100%" height="150" style={{ objectFit: 'contain' }} />
              <div className="style-center">
                <button className="button-buy">Buy</button>
              </div>
            </div>
          </div>
          <div className="section-third-box">
            <div>
              <div className="text-center">Garena 1000</div>
              <img src={garenaCard} width="100%" height="150" style={{ objectFit: 'contain' }} />
              <div className="style-center">
                <button className="button-buy">Buy</button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </Layout>
  )
}

export default IndexPage
