/**
 * 
 */
Number.prototype.numberFormat = function() {
	if (this == 0)
		return '0';
	let regex = /(^[+-]?\d+)(\d{3})/;
	let nstr = (this + '');
	while (regex.test(nstr)) {
		nstr = nstr.replace(regex, '$1' + ',' + '$2');
	}
	return nstr;
};

document.addEventListener('DOMContentLoaded', function() {
	const subBtn = document.getElementById('subBtn');
	const addBtn = document.getElementById('addBtn');
	const inputQty = document.getElementById('inputQuantity');
	const productPrice = parseInt(document.getElementById('productPrice').dataset.price);
	const sumPrice = document.getElementById('sum_p_price').querySelector('span');
	const addCartBtn = document.getElementById('addCartBtn');
	const buyBtn = document.getElementById('buyBtn');
	const orderForm = document.getElementById('orderForm');
	const formProdCnt = document.getElementById('formProdCnt');
	const prodNo = document.getElementById('prodNo').textContent;

	function TotalPrice() {
		const qty = parseInt(inputQty.value);
		const total = qty * productPrice;
		sumPrice.textContent = (total).numberFormat() + '원';
	}

	subBtn.addEventListener('click', function() {
		let currentValue = parseInt(inputQty.value);
		if (currentValue > 1) {
			inputQty.value = currentValue - 1;
			TotalPrice();
		}
	});

	addBtn.addEventListener('click', function() {
		let currentValue = parseInt(inputQty.value);
		inputQty.value = currentValue + 1;
		TotalPrice();
	});

	inputQty.addEventListener('input', function() {
		let currentValue = parseInt(inputQty.value);
		if (isNaN(currentValue) || currentValue < 1) {
			inputQty.value = 1;
		}
		TotalPrice();
	});

	// 장바구니 버튼 클릭
	addCartBtn.addEventListener('click', function() {
		const cartCnt = parseInt(inputQty.value);
		console.log(prodNo);
		console.log(cartCnt);
		cartSvc.checkCart(prodNo, result => {
			if (result.retCode == 'OK') {
				alert('해당상품이 장바구니에 있습니다.');
			} else {
				cartSvc.addCart(prodNo, cartCnt, result => {
					if (result.retCode == 'OK') {
						window.location.href = 'cart.do';
					} else {
						Swal.fire({
							title: '로그인이 필요한 서비스입니다.',
							text: "로그인 페이지로 이동하시겠습니까?",
							icon: 'warning',
							showCancelButton: true,
							confirmButtonColor: '#3085d6',
							cancelButtonColor: '#d33',
							confirmButtonText: '승인',
							cancelButtonText: '취소'
						}).then(result => {
							if (result.isConfirmed) {
								location.href = "login.do";
							}
						})
						console.log('처리실패');
					}
				},
					err => console.log(err));
			}
		},
			err => console.log(err));
	});
	buyBtn.addEventListener('click', function() {
		const cartCnt = parseInt(inputQty.value);
		console.log('주문상품:' + prodNo);
		console.log('주문수량:' + cartCnt);

		formProdCnt.value = cartCnt;
		orderForm.submit();
	});


	TotalPrice();

	console.log(userId);
	console.log(prodNo);
	let rpage = 1;

	document.getElementById('review-tab').addEventListener('click', function() {
		const prodNo = document.getElementById('prodNo').textContent;
		console.log(prodNo);
		showList();
		function showList() {
			document.querySelectorAll('div.reviewList ul li').forEach((li, idx) => {
				if (idx >= 3) {
					li.remove();
				}
			})
			svc.reviewList({ prodNo: prodNo, rpage: rpage },
				result => {
					console.log(result);
					result.forEach(review => {
						const row = makeRow(review);
						document.querySelector('div.reviewList ul').appendChild(row);
					})
					makePageInfo();
				},
				err => {
					console.log(err);
				}
			)
		}
		function makeRow(review = {}) {
			let tmpl = document.querySelector('div.reviewList ul li:nth-of-type(3)').cloneNode(true);
			tmpl.style.display = 'block';
			tmpl.setAttribute('data-rno', review.reviewNo);
			tmpl.setAttribute('data-userId', review.userId);
			tmpl.querySelector('span:nth-of-type(1)').innerText = review.reviewScore;
			tmpl.querySelector('span:nth-of-type(2)').innerText = review.reviewContent;
			tmpl.querySelector('span:nth-of-type(3)').innerText = review.userId;
			tmpl.querySelector('span:nth-of-type(4)').innerText = new Date(review.reviewDate).toLocaleString();

			const deleteBtn = tmpl.querySelector('#deleteBtn');
			if (review.userId !== userId) {
				deleteBtn.style.display = 'none';
			}
			const modifyBtn = tmpl.querySelector('#modifyBtn');
			if (review.userId !== userId) {
				modifyBtn.style.display = 'none';
			}
			return tmpl;
		}
		document.querySelector('div.reviewList ul').addEventListener('click', function(e) {
			if (e.target && e.target.id === 'deleteBtn') {
				const reviewNo = e.target.parentElement.parentElement.dataset.rno;
				const reviewUserId = e.target.parentElement.parentElement.dataset.userid;
				console.log(reviewNo);
				console.log(reviewUserId);

				if (userId === reviewUserId) {
					svc.removeReview(reviewNo,
						result => {
							if (result.retCode === 'OK') {
								alert('삭제완료');
								showList();
								updateProductAvgScore(prodNo);
							} else if (result.retCode === 'NG') {
								alert('삭제를 완료할 수 없습니다.');
							} else {
								alert('알 수 없는 반환값');
							}
						},
						err => console.log(err)
					);
				} else {
					alert('다른 사람의 댓글을 삭제할 수 없습니다.');
				}
			}
		});

		document.getElementById('addReview').addEventListener('click', function(e) {
			e.preventDefault();
			let reviewContent = document.getElementById('reviewContent').value;
			let reviewScore = document.getElementById('reviewScore').value;
			const prodNo = document.getElementById('prodNo').textContent.trim();
			console.log('상품번호:' + prodNo);
			console.log('평점:' + reviewScore);
			console.log('내용:' + reviewContent);
			console.log('작성자:' + userId);
			if (!userId) {
				alert('로그인하세요');
				return;
			}
			if (!prodNo) {
				alert('상품 번호가 없습니다.');
				return;
			}
			if (!reviewContent) {
				alert('댓글 내용을 입력하세요');
				return;
			}
			svc.addReview({ prodNo: prodNo, userId: userId, reviewContent: reviewContent, reviewScore: reviewScore },
				result => {
					if (result.retCode == 'OK') {
						const row = makeRow(result.retVal);
						const reviewList = document.querySelector('div.review ul');
						if (reviewList) {
							reviewList.appendChild(row);
						}
						document.querySelector('#reviewContent').value = "";
						showList();
						updateProductAvgScore(prodNo);
					}
				},
				err => console.log(err)
			);

		});
		let pagination = document.querySelector('div.pagination');

		function makePageInfo() {
			svc.getTotalCount(prodNo,
				createPageList	//성공햇을떄 실행할 함수
			),
				err => console.log(err);
		}

		function createPageList(result) {
			console.log(result);

			let totalCnt = result.totalCount;
			let startPage, endPage, realEnd;
			let prev, next;

			realEnd = Math.ceil(totalCnt / 10);

			endPage = Math.ceil(rpage / 10) * 10;
			startPage = endPage - 9;
			endPage = endPage > realEnd ? realEnd : endPage;

			prev = startPage > 1;
			next = endPage < realEnd;

			console.log(startPage, endPage, realEnd, prev, next);

			// a 태그 생성. 
			pagination.innerHTML = '';

			//이전 페이지 여부.
			if (prev) {
				let aTag = document.createElement('a');
				aTag.setAttribute('data-page', startPage - 1);
				aTag.setAttribute('href', '#');
				aTag.innerHTML = "&laquo;";
				aTag.addEventListener('click', function(e) {
					e.preventDefault(); // a 태그는 페이지이동.
					rpage = parseInt(e.target.dataset.page, 10); //페이지 지정
					showList();
				})
				pagination.appendChild(aTag);
			}
			for (let rpg = startPage; rpg <= endPage; rpg++) {
				let aTag = document.createElement('a');
				aTag.setAttribute('data-page', rpg);
				aTag.setAttribute('href', rpg);
				if (rpg == rpage) {
					aTag.className = 'active';
				}
				aTag.innerHTML = rpg;
				aTag.addEventListener('click', function(e) {
					e.preventDefault(); // a 태그는 페이지이동.
					rpage = parseInt(e.target.dataset.page, 10);//페이지 지정
					showList();
				})
				pagination.appendChild(aTag);

			}
			//이후 페이지 여부.
			if (next) {
				let aTag = document.createElement('a');
				aTag.setAttribute('data-page', endPage + 1);
				aTag.setAttribute('href', '#');
				aTag.innerHTML = "&raquo;";
				aTag.addEventListener('click', function(e) {
					e.preventDefault(); // a 태그는 페이지이동.
					rpage = parseInt(e.target.dataset.page, 10); //페이지 지정
					showList();
				})
				pagination.appendChild(aTag);
			}
		}
		function updateProductAvgScore(prodNo) {
			fetch('updateProductAvgScore.do?prodNo=' + prodNo)
				.then(response => response.json())
				.then(result => {
					if (result.result == "OK") {

					}
				})
				.catch(err => {
					console.log(err)
				});
		}

		document.querySelector('div.reviewList ul').addEventListener('click', function(e) {
			if (e.target && e.target.id === 'modifyBtn') {
				const reviewUserId = e.target.parentElement.parentElement.dataset.userid;

				if (userId === reviewUserId) {
					const li = e.target.parentElement.parentElement;
					const spans = li.querySelectorAll('span');

					spans.forEach((span, index) => {
						let input;
						if (index === 0) {
							// 첫 번째 span -> input type="number"
							input = document.createElement('input');
							input.type = 'number';
							input.value = span.textContent;
						} else if (index === 1) {
							// 두 번째 span -> input type="text"
							input = document.createElement('input');
							input.type = 'text';
							input.value = span.textContent;
						}

						if (input) {
							// span 요소를 input 요소로 교체
							li.replaceChild(input, span);

							// input 요소에 focus 설정
							input.focus();
						}
					});

					e.target.innerText = "수정완료";
					e.target.id = 'completeBtn';

					// 수정 완료 버튼 클릭 이벤트 핸들러 등록
					li.addEventListener('click', function(e) {
						if (e.target.id === 'completeBtn') {
							const reviewNo = li.dataset.rno;
							const reviewLike = li.children[0].value;
							const reviewCon = li.children[1].value;
							console.log(reviewLike);
							svc.modifyview({ reviewNo, reviewCon, reviewLike },
								result => {
									if (result.retCode === 'OK') {
										alert('수정완료');

										// 수정 완료 후 span 요소 업데이트
										spans.forEach((span, index) => {
											if (index === 0) {
												span.textContent = reviewLike;
											} else if (index === 1) {
												span.textContent = reviewCon;
											}
										});

										showList();
										updateProductAvgScore(prodNo);
									} else if (result.retCode === 'NG') {
										alert('수정실패');
									} else {
										alert('알 수 없는 반환값');
									}
								},
								err => console.log(err)
							);
						}
					});
				} else {
					alert('다른 사람의 댓글을 수정할 수 없습니다.');
				}
			}
		});
	})


});
