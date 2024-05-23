<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<form action="/master/itemInsert" method="post" name="itemInsertForm"
	id="itemInsertForm" enctype="multipart/form-data">

	<div class="tab-content">
		<!-- 상품등록 -->
		<div class="tab-pane active" id="itemInsert_1">
			<div class="form-group" style="">
				<input type="hidden" value="${TopCategoryList.categoryCode }"/>
				<h3>대분류</h3>
				<select class="form-control" name="item_catemain" id="item_catemain"
					title="상품 대분류">
					<option value="1">사료</option>
					<option value="2">간식</option>
					<option value="3">건강관리</option>
					<option value="4">배변용품</option>
					<option value="5">장난감</option>
					<option value="6">미용/목욕</option>
					<option value="7">리빙</option>
				</select>
				<h3>소분류</h3>
				<select class="form-control" name="item_catesub" id="item_catesub"
					title="상품 소분류">
					<option value=""></option>
				</select>
			</div>
			<hr class="divider-w mt-10 mb-20">
			<div class="form-group">
				<h3>상품명</h3>
				<input class="form-control input-lg" type="text" placeholder="상품명"
					name="item_name" id="item_name" />
			</div>
			<hr class="divider-w mt-10 mb-20">
			<div class="form-group">
				<h3>판매가</h3>
				<input class="form-control input-lg" type="number"
					placeholder="판매가 / 단위 : 원" name="item_price" id="item_price" />
			</div>

			<div class="form-group">
				<h3>상품설명</h3>
				<input class="form-control input-lg" type="text" placeholder="상품설명"
					name="item_subcontent" id="item_subcontent" />
			</div>
			<hr class="divider-w mt-10 mb-20">
			<!-- 상품내용 에디터 -->
			<div class="form-group">
				<h3>상품내용</h3>
				<textarea class="form-control input-lg" placeholder="내용을 입력하세요"
					name="item_content" id="item_content">
											</textarea>

			</div>
			<!-- 상품등록 끝-->

			<!--  상품이미지 -->
			<div class="tab-pane" id="itemInsert_3">

				<div class="form-group">
					<h3>메인이미지 ( 썸네일 )</h3>
					<input class="form-control input-lg" type="file" name="itemMainImg"
						id="itemMainImg" />
				</div>

				<div class="form-group">
					<h3>서브이미지 ( 썸네일에 마우스 올릴시 )</h3>
					<input class="form-control input-lg" type="file" name="itemSubImg"
						id="itemSubImg" />
				</div>
				<button class="btn btn-d btn-circle" type="button"
					onclick="fnSubmit(); return false;">상품등록</button>

			</div>
</form>

<!--  상품이미지 끝 -->
<script src="js/adminAddProduct.js">

</script>