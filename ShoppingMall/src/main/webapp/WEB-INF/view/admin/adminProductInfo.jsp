<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<style>
#subBtn, #addBtn {
	border: none;
}

.form-control {
	margin-right: 0 !important;
}

.d-flex {
	margin-bottom: 20px;
}

.right-align {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin-top: 20px;
}

.right-align .btn {
	margin-left: 10px;
}

#sum_p_price {
	margin-top: 20px;
	font-size: 1.25rem;
	font-weight: bold;
	text-align: right;
}

.box {
	display: inline-block;
}

.align-bottom {
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	height: 100%;
}

ul, li {
	list-style-type: none;
}

#section {
	margin: 0 auto;
}

.review-form {
	margin-top: 20px;
}

.review-form textarea {
	width: 100%;
	height: 100px;
}

.review-list {
	margin-top: 20px;
}

.review-item {
	border-bottom: 1px solid #ddd;
	padding: 10px 0;
}

div.reviewList div {
	margin: auto;
}

div.review ul {
	list-style-type: none;
	margin-top: 5px;
}

div.review li {
	padding-top: 1px;
	padding-bottom: 1px;
}

div.review span {
	display: inline-block;
}

.reviewList {
	text-align: center;
}
</style>
<link href="css/pagging.css" rel="stylesheet" />

<section id="section" class="py-5">
	<div class="container px-4 px-lg-5 my-5">

		<form name="myFrm">
			<input type="hidden" name="prodNo" value="${product.prodNo }">

		</form>
		<div class="row gx-4 gx-lg-5 align-items-center">
			<div class="col-md-6">
				<img class="card-img-top mb-5 mb-md-0"
					src="images/${product.prodImage}" alt="..." />
			</div>
			<div class="col-md-6 align-bottom">
				<div>
					<div class="small mb-1">
						상품코드: <span id="prodNo">${product.prodNo}</span>
					</div>
					<h1 class="display-5 fw-bolder">상품명 : ${product.prodName}</h1>
					<div class="fs-5 mb-5">
						<span id="productPrice" data-price="${product.prodPrice}">가격
							: <fmt:formatNumber value="${product.prodPrice}" />원
						</span>
					</div>
					<div>
						<span id="productCode">카테고리명 : ${product.categoryName }</span>
					</div>
					<div>
						<span id="productCode">판매수 : ${product.prodSale }</span>
					</div>
					<div>
						<span id="productCode">등록일 : <fmt:formatDate
								value="${product.prodDate }" pattern="yyyy-MM-dd" /></span>
					</div>



				</div>
				<div class="right-align">
					<button id="modBtn" class="btn btn-outline-dark flex-shrink-0"
						type="button">
						<i class="bi-cart-fill me-1"></i> 상품수정
					</button>
					<button id="delBtn" class="btn btn-outline-dark flex-shrink-0"
						type="button">
						<i class="bi-cart-fill me-1"></i> 상품삭제
					</button>
				</div>
			</div>
		</div>
	</div>
	<div class="row gx-4 gx-lg-5 my-5">
		<div class="col-md-12">
			<ul class="nav nav-tabs" id="myTab" role="tablist">
				<li class="nav-item" role="presentation">
					<button class="nav-link active" id="description-tab"
						data-bs-toggle="tab" data-bs-target="#description" type="button"
						role="tab" aria-controls="description" aria-selected="true">상품정보</button>
				</li>
				<li class="nav-item" role="presentation">
					<button class="nav-link" id="review-tab" data-bs-toggle="tab"
						data-bs-target="#review" type="button" role="tab"
						aria-controls="review" aria-selected="false">리뷰</button>
				</li>
			</ul>
			<div class="tab-content" id="myTabContent">
				<div class="tab-pane fade show active" id="description"
					role="tabpanel" aria-labelledby="description-tab">
					<div class="col-md-12">
						<img class="card-img-top mb-5 mb-md-0" src="images/건식사료설명1.jpg"
							alt="..." />
					</div>
				</div>
				<div class="tab-pane fade" id="review" role="tabpanel"
					aria-labelledby="review-tab">
					<div class="reviewScore"></div>
					<div class="reviewWrite">
						<form id="reviewForm" class="review-form">
							<input type="hidden" name="prodNo" value="${product.prodNo}" />
							<div class="form-group">
								<label for="reviewScore">평점</label> <select id="reviewScore"
									name="reviewScore" class="form-control" required>
									<option value="5">5</option>
									<option value="4">4</option>
									<option value="3">3</option>
									<option value="2">2</option>
									<option value="1">1</option>
								</select>
							</div>
							<div class="form-group">
								<label for="reviewContent">리뷰 작성</label>
								<textarea id="reviewContent" name="reviewContent"
									class="form-control" required></textarea>
							</div>
							<button id="addReview" type="submit" class="btn btn-primary">작성</button>
						</form>
					</div>
					<div class="reviewList">
						<ul>
							<li><span class="col-sm-2">글번호</span> <span class="col-sm-2">평점</span>
								<span class="col-sm-5">댓글내용</span> <span class="col-sm-2">작성자</span>
								<span class="col-sm-2">작성일</span> <span class="col-sm-2">삭제</span></li>
							<li>
								<hr />
							</li>
							<li style="display: none;"><span class="col-sm-2">2</span> <span
								class="col-sm-5">평점</span> <span class="col-sm-2">댓글내용</span> <span
								class="col-sm-2">user02</span> <span class="col-sm-2">작성일</span>
								<span class="col-sm-2"><button id="deleteBtn"
										class="btn btn-warning">삭제</button></span></li>
						</ul>
						<div class="footer">
							<div class="center">
								<div class="pagination">
									<a href="#">1</a> <a href="#" class="active">2</a> <a href="#">3</a>
									<a href="#">4</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<script src="js/adminreview.js"></script>
<script src="js/adminProductInfo.js"></script>