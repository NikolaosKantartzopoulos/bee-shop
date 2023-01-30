import Image from "next/image";
import React, { useContext, useState } from "react";

import CartContext from "../../data/context/cart-context";
import ToolsContext from "../../data/context/tools-context";

import cartSVG from "../../public/assets/images/cart.svg";
import Button from "../UI/Button";

import styles from "./Header.module.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function Cart() {
	const cartCtx = useContext(CartContext);
	const toolsCtx = useContext(ToolsContext);

	const router = useRouter();
	const { data: session } = useSession();

	const [orderSubmited, setOrderSubmited] = useState(false);

	function handleDropdownVisibility() {
		if (toolsCtx.dropdownOpen === "") {
			toolsCtx.setDropdownOpen("cartDropdownVisible");
		} else {
			toolsCtx.setDropdownOpen("");
		}
	}

	async function handlePushToOrderDetailsPage() {
		if (cartCtx.cartState.items.length === 0) {
			alert("Cart is empty!");
			return;
		}

		toolsCtx.setDropdownOpen(null);
		router.replace({
			pathname: "/shop/get-order-details",
		});
	}

	function resetShopUI() {
		setOrderSubmited(false);
	}

	function deleteItemsHandler(item) {
		cartCtx.removeItem(item);
	}

	return (
		<div
			className={styles.cart}
			onClick={() => {
				router.pathname === "/shop/get-order-details"
					? null
					: handleDropdownVisibility();
			}}
			style={{
				opacity: router.pathname === "/shop/get-order-details" ? 0.5 : null,
			}}
		>
			<Image src={cartSVG} alt="cart" height={30} width={30} />
			<span>{cartCtx.cartState ? cartCtx.cartState.totalCost : 0} €</span>
			<span>{cartCtx.getAmountOfItemsInCart()}</span>
			{toolsCtx.dropdownOpen == "cartDropdownVisible" && (
				<div
					id="cartDropdown"
					className={styles.cartDropdown}
					onClick={(e) => e.stopPropagation()}
				>
					{cartCtx.cartState.items.length !== 0 && (
						<>
							<div>
								{cartCtx.cartState.items.map((item) => (
									<div className={styles.itemRow} key={item._id}>
										<span>{item.title}</span>
										<span>{item.numberOfItems}</span>
										<Button onClick={() => deleteItemsHandler(item)}>
											Delete
										</Button>
									</div>
								))}
							</div>
							{!orderSubmited && (
								<Button
									onClick={handlePushToOrderDetailsPage}
									style={{ margin: "auto" }}
								>
									Proceed
								</Button>
							)}
						</>
					)}

					{orderSubmited && (
						<>
							<p>Order confirmed!</p>
							<Button onClick={resetShopUI}>New Order!</Button>
						</>
					)}
					{!orderSubmited && cartCtx.cartState.items.length === 0 && (
						<p>{session ? "Cart is Empty!" : "Sign in to order!"}</p>
					)}
				</div>
			)}
		</div>
	);
}

export default Cart;
