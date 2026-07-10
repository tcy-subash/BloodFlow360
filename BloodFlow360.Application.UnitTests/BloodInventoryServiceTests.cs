using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BloodFlow360.Application.DTOs.BloodInventory;
using BloodFlow360.Application.Interfaces;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Application.Services;
using BloodFlow360.Domain.Entities;
using FluentAssertions;
using Moq;
using Xunit;

namespace BloodFlow360.Application.UnitTests
{
    public class BloodInventoryServiceTests
    {
        private readonly Mock<IBloodInventoryRepository> _repositoryMock;
        private readonly Mock<IUnitOfWork> _unitOfWorkMock;
        private readonly Mock<IMapper> _mapperMock;
        private readonly BloodInventoryService _service;

        public BloodInventoryServiceTests()
        {
            _repositoryMock = new Mock<IBloodInventoryRepository>();
            _unitOfWorkMock = new Mock<IUnitOfWork>();
            _mapperMock = new Mock<IMapper>();
            _service = new BloodInventoryService(_repositoryMock.Object, _unitOfWorkMock.Object, _mapperMock.Object);
        }

        [Fact]
        public async Task GetPagedAsync_ShouldReturnMappedDtosAndTotalCount()
        {
            // Arrange
            int pageNumber = 1;
            int pageSize = 10;
            string search = "O+";
            int expectedTotalCount = 5;

            var entities = new List<BloodInventory>
            {
                new BloodInventory { Id = Guid.NewGuid(), BloodGroupId = Guid.NewGuid(), UnitsAvailable = 12 },
                new BloodInventory { Id = Guid.NewGuid(), BloodGroupId = Guid.NewGuid(), UnitsAvailable = 8 }
            };

            var dtos = new List<BloodInventoryDto>
            {
                new BloodInventoryDto { Id = entities[0].Id, UnitsAvailable = 12 },
                new BloodInventoryDto { Id = entities[1].Id, UnitsAvailable = 8 }
            };

            _repositoryMock.Setup(repo => repo.GetPagedAsync(pageNumber, pageSize, search))
                .ReturnsAsync((entities, expectedTotalCount));

            _mapperMock.Setup(m => m.Map<IEnumerable<BloodInventoryDto>>(entities))
                .Returns(dtos);

            // Act
            var result = await _service.GetPagedAsync(pageNumber, pageSize, search);

            // Assert
            result.Should().NotBeNull();
            result.TotalCount.Should().Be(expectedTotalCount);
            result.Items.Should().BeEquivalentTo(dtos);

            _repositoryMock.Verify(repo => repo.GetPagedAsync(pageNumber, pageSize, search), Times.Once);
            _mapperMock.Verify(m => m.Map<IEnumerable<BloodInventoryDto>>(entities), Times.Once);
        }

        [Fact]
        public async Task CreateAsync_ShouldMapDtoToEntity_SaveAndCommit()
        {
            // Arrange
            var createDto = new CreateBloodInventoryDto
            {
                BloodGroupId = Guid.NewGuid(),
                BloodBankId = Guid.NewGuid(),
                UnitsAvailable = 20,
                MinimumStockLevel = 5
            };

            var entity = new BloodInventory
            {
                Id = Guid.NewGuid(),
                BloodGroupId = createDto.BloodGroupId,
                UnitsAvailable = createDto.UnitsAvailable
            };

            _mapperMock.Setup(m => m.Map<BloodInventory>(createDto)).Returns(entity);
            _repositoryMock.Setup(repo => repo.AddAsync(entity)).Returns(Task.CompletedTask);
            _unitOfWorkMock.Setup(u => u.SaveChangesAsync(default)).ReturnsAsync(1);

            // Act
            await _service.CreateAsync(createDto);

            // Assert
            _mapperMock.Verify(m => m.Map<BloodInventory>(createDto), Times.Once);
            _repositoryMock.Verify(repo => repo.AddAsync(entity), Times.Once);
            _unitOfWorkMock.Verify(u => u.SaveChangesAsync(default), Times.Once);
        }
    }
}
