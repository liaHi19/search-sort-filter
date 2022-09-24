import React, { FC } from "react";

import { useItems } from "core/hooks/useItems";

import Spinner from "./ui/Spinner";

const ProductList: FC = () => {
  const getItems = useItems();
  const items = getItems.data ?? [];

  if (getItems.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-75">
      <div className="flex flex-wrap item-grid pt2">
        {items.map((item, key) => {
          return (
            <div key={item.name} className="w-100 w-50-l ph3">
              <a className="link black hover-light-purple" href="/t">
                <div className="flex flex-column h-100">
                  <img
                    style={{ objectFit: "cover", height: "420px" }}
                    alt=""
                    loading="lazy"
                    className="img flex-auto bg-gray"
                    src={item.src}
                  />

                  <div className="pt3 pb5 flex flex-column">
                    <b className="mb1">{item.name}</b>
                    <i className="mb3 gray">{item.color}</i>
                    <p className="ma0 b black">${item.price / 100}</p>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
