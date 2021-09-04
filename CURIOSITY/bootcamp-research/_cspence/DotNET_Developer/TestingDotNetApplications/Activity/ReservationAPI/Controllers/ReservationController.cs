using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ReservationAPI.Domain;
using ReservationAPI.Models;

namespace ReservationAPI.Controllers
{
	[Route("api/[controller]")]

	/// <summary>
	/// API controller for managing the reservations
	/// </summary>
	public class ReservationsController : Controller
	{
		private readonly IReservationsService _service;

		public ReservationsController(IReservationsService service)
		{
			_service = service;
		}

		public IEnumerable<ReservationDetail> Get()
		{
			return _service.All();
		}

		public ReservationDetail Get(int id)
		{
			return _service.GetById(id);
		}

		public IEnumerable<ReservationDetail> Get(DateTime day, int assetNumber)
		{
			return _service.Get(day, assetNumber);
		}

		public IEnumerable<ReservationDetail> Get(DateTime dayTime)
		{
			return _service.GetAvailableItems(dayTime);
		}

		public ValidationResult Post([FromBody]ReservationDetail item)
		{
			return _service.Add(item);
		}

		public void Delete(int id)
		{
			_service.Delete(id);
		}
	}
}
